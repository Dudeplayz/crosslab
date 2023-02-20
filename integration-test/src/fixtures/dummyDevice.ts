import {APIClient} from '@cross-lab-project/api-client';
import assert from 'assert';
import {ChildProcessWithoutNullStreams, execSync, spawn} from 'child_process';
import fs from 'fs';
import {resolve} from 'path';
import {TypedEmitter} from 'tiny-typed-emitter';

const repository_dir = resolve(__filename, '../../../../');

export interface DummyDeviceEvents {
  websocketToken(token: string): void;
  connectionsChanged(connections: {url: string; state: string}[]): void;
  websocketConnected(): void;
  gpio(event: {signal: string; value: string}): void;
}

function createPythonEnvironment() {
  // if venv is not created, create it
  if (!fs.existsSync(`${repository_dir}/integration-test/venv`)) {
    execSync('virtualenv venv && venv/bin/pip install -r requirements.txt', {cwd: `${repository_dir}/integration-test`});
  }
}

export class DummyDevice extends TypedEmitter<DummyDeviceEvents> {
  private binary: string[];
  private debugPrint?: string;
  private process: ChildProcessWithoutNullStreams | undefined;

  public url = '';

  constructor(type: 'js' | 'python', debug: boolean | number = false, host_debug: boolean | number = false) {
    super();
    switch (type) {
      case 'js':
        this.binary = `node${host_debug ? ` --inspect-brk=${host_debug}` : ''} node_modules/@crosslab/dummy-device/app/index.js${
          debug ? ` --browser-inspect ${debug}` : ''
        }`.split(' ');
        if (host_debug) {
          this.debugPrint = `    js dummy device host started with debug port ${host_debug}. Please attach debugger`;
        }
        if (debug) {
          this.debugPrint =
            (this.debugPrint ? this.debugPrint + '\n' : '') + `    js dummy device started with debug port ${debug}. Please attach debugger`;
        }
        break;
      case 'python':
        createPythonEnvironment();
        if (debug) {
          this.binary =
            `${repository_dir}/integration-test/venv/bin/python -m debugpy --listen ${debug} --wait-for-client -m dummy_device`.split(' ');
          this.debugPrint = `    python dummy device started with debug port ${debug}. Please attach debugger`;
        } else {
          this.binary = `${repository_dir}/integration-test/venv/bin/python -m dummy_device`.split(' ');
        }
        break;
    }
  }

  public async start(client: APIClient, deviceUrl: string) {
    assert(this.process === undefined, 'Device already started');
    this.url = deviceUrl;

    const cli = ['--url', client.url, '--auth-token', client.accessToken, '--device-url', deviceUrl];

    this.process = spawn(this.binary[0], [...this.binary.slice(1), ...cli], {env: {...process.env}});
    if (this.debugPrint) {
      console.log(this.debugPrint);
    }

    this.process.stderr.on('data', data => {
      console.error(data.toString());
    });

    let stdout = '';
    this.process.stdout.on('data', data => {
      stdout += data.toString();
      const lines = stdout.split('\n');
      stdout = lines.pop() ?? '';
      for (const line of lines) {
        console.log(line);
        const split_line = line.split(' ');
        if (split_line.length >= 1) {
          const event = split_line[0];
          const param = split_line.splice(1).join(' ');
          if (event == `[websocketToken]`) {
            this.emit('websocketToken', JSON.parse(param));
          }
          if (event == `[connectionsChanged]`) {
            this.emit('connectionsChanged', JSON.parse(param));
          }
          if (event == `[websocketConnected]`) {
            this.emit('websocketConnected');
          }
          if (event == `[gpio]`) {
            this.emit('gpio', JSON.parse(param));
          }
        }
      }
    });
  }

  public async stop() {
    assert(this.process !== undefined, 'Device not started');
    this.process.kill('SIGINT');
  }

  public send(event: 'gpio', data: {signal: string; value: 'strongH' | 'strongL'}): void;
  public send(event: string, data: unknown) {
    assert(this.process !== undefined, 'Device not started');
    this.process.stdin.cork();
    this.process.stdin.write('[' + event + '] ' + JSON.stringify(data) + '\n');
    this.process.stdin.uncork();
  }
}
