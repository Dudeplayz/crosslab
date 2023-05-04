import {APIClient, DeviceServiceTypes, ExperimentServiceTypes} from '@cross-lab-project/api-client';
import assert from 'assert';
import {TypedEmitter} from 'tiny-typed-emitter';

import {DummyDevice, DummyDeviceEvents} from '../fixtures/dummyDevice';

function createDummyDevice(type: 'js' | 'python', index: number, context: Mocha.Context) {
  switch (type) {
    case 'js':
      // eslint-disable-next-line max-len
      return new DummyDevice(
        type,
        context.debug?.jsDevice?.[index]?.debug_port,
        context.debug?.jsDeviceHost?.[index]?.debug_port,
        `test-js-device${index}.log`,
        context,
      );
    case 'python':
      return new DummyDevice(type, context.debug?.pythonDevice?.[index]?.debug_port, undefined, `test-python-device${index}.log`, context);
  }
}

type DeviceMeta = {
  name: string;
  description: string;
};

enum State {
  None = 0,
  Created = 1,
  Connected = 2,
  Running = 3,
  Stopped = 4,
}

type MessageEvents = {
  eventsChanged: () => void;
};

export class ExperimentTest extends TypedEmitter<MessageEvents> {
  devices: DummyDevice[] = [];
  deviceMetas: DeviceMeta[] = [];
  apiDevices: (DeviceServiceTypes.ConcreteDevice<'response'> & {url: string})[] = [];
  events: {gpio: Parameters<DummyDeviceEvents['gpio']>[0][]}[] = [];

  _state: State = State.None;

  async eventCount(eventCount: number) {
    await new Promise<void>(resolve => {
      const callback = () => {
        if (this.events.reduce((p, e) => p + e.gpio.length, 0) >= eventCount) {
          resolve();
          this.off('eventsChanged', callback);
        }
      };
      if(this.events.reduce((p, e) => p + e.gpio.length, 0) >= eventCount){
        resolve();
      }else{
        this.on('eventsChanged', callback);
      }
    });
  }

  async createAPIDevices(client: APIClient) {
    for (const deviceMeta of this.deviceMetas) {
      const apiDevice = (await client.createDevice({
        type: 'device',
        ...deviceMeta,
        announcedAvailability: [
          {
            available: true,
          },
        ],
      })) as DeviceServiceTypes.ConcreteDevice<'response'>;

      assert(apiDevice.url, 'Device URL is not defined'); // TODO: Issue 32

      this.apiDevices.push({...apiDevice, url: apiDevice.url});
    }

    this._state = State.Created;
  }

  async connect(client: APIClient) {
    if (this._state < State.Created) await this.createAPIDevices(client);

    const promiseList = this.devices.map(device => new Promise<void>(resolve => device.once('websocketConnected', resolve)));
    for (const [idx, device] of this.devices.entries()) {
      this.events.push({gpio: []});
      device.on('gpio', event => this.events[idx].gpio.push(event) && this.emit('eventsChanged'));
      device.start(client, this.apiDevices[idx].url);
    }
    await Promise.all(promiseList);

    for (const device of this.apiDevices) {
      assert((await client.getDevice(device.url)).connected, 'Device is not connected');
    }

    this._state = State.Connected;
  }

  async run(client: APIClient, experiment: ExperimentServiceTypes.Experiment<'request'>) {
    if (this._state < State.Connected) await this.connect(client);

    const promiseList = this.devices.map(
      device =>
        new Promise<void>(resolve =>
          device.on('connectionsChanged', connections => connections.every(c => c.state === 'connected') && resolve()),
        ),
    );

    experiment = {
      status: 'running',
      roles: this.deviceMetas.map((m, idx) => ({name: 'device' + (idx + 1), description: m.description})),
      devices: this.apiDevices.map((d, idx) => ({role: 'device' + (idx + 1), device: d.url})),
      ...experiment,
    };
    const apiExperiment = await client.createExperiment(experiment);
    assert(apiExperiment.status === 'running', 'Experiment is not running');
    await Promise.all(promiseList);

    this._state = State.Running;
  }

  addDevice(context: Mocha.Context, type: 'js' | 'python', name?: string, description?: string) {
    this.devices.push(createDummyDevice(type, this.devices.length + 1, context));
    const deviceTypeName = {js: 'JS', python: 'Python'}[type];
    this.deviceMetas.push({
      name: name ?? `${deviceTypeName} Device ${this.devices.length}`,
      description: description ?? `A ${deviceTypeName} test device`,
    });
  }

  stop() {
    for (const device of this.devices) {
      device.stop();
    }

    this._state = State.Stopped;
  }
}