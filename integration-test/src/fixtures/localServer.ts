import {APIClient} from '@cross-lab-project/api-client';
import {ChildProcessWithoutNullStreams, execSync, spawn} from 'child_process';
import fs from 'fs';
import path from 'path';

import {ENV} from './localServer.config';

const repository_dir = path.resolve(__filename, '../../../../');

type Service = {
  process: ChildProcessWithoutNullStreams;
  stdout: string;
  stderr: string;
};

export interface ServerContext {
  authService: Service;
  deviceService: Service;
  experimentService: Service;
  federationService: Service;
  gatewayService: Service;
  bookingBackend: Service;
  bookingFrontend: Service;
  deviceReservation: Service;
  scheduleService: Service;
  client: APIClient;
}

function prepare_service(name: string, process: ChildProcessWithoutNullStreams, context: ServerContext & Mocha.Context): Service {
  const ret = {
    process,
    stdout: '',
    stderr: '',
  };
  process.stdout.on('data', data => {
    ret.stdout += data;
    context.log(`test-${name}.log`, data.toString(), 'log');
  });
  process.stderr.on('data', data => {
    ret.stderr += data;
    context.log(`test-${name}.log`, data.toString(), 'err');
  });
  return ret;
}

function start_service(
  service_path: string,
  env: {[key: string]: string},
  clear = false,
  debug: boolean | number = false,
  context: ServerContext & Mocha.Context,
) {
  const additional_params = [];
  if (clear) {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fs.rm(`db/${service_path}.db`, () => {});
  }
  if (debug) {
    if (typeof debug === 'number') {
      additional_params.push('--inspect-brk=' + debug.toString());
    } else if (debug) {
      additional_params.push('--inspect-brk');
    }
  }

  const service = spawn('node', [...additional_params, `node_modules/@crosslab/service-${service_path}/app/index.js`], {
    env: {PATH: process.env.PATH, ...env},
  });

  if (debug) {
    console.log(`Service ${service_path} started with debug port ${debug}. Please attach debugger`);
  }

  return prepare_service(service_path, service, context);
}

function start_gateway(gateway_path: string, env: {[key: string]: string}, context: ServerContext & Mocha.Context) {
  execSync('./scripts/create_config.sh', {env: {...process.env, ...env}, cwd: gateway_path}).toString();
  const nginx_conf_dir = path.resolve(gateway_path, 'conf_compiled');
  const service = spawn('nginx', ['-g', 'daemon off;', '-p', nginx_conf_dir, '-c', nginx_conf_dir + '/nginx.conf'], {
    env: {...process.env, ...env},
    cwd: gateway_path,
  });
  return prepare_service('gateway', service, context);
}

async function wait_for_health_check(endpoint: string, timeout = 60000) {
  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const res = await fetch(endpoint);
      if (res.status === 200) {
        return;
      } else {
        // ignore
      }
    } catch (e) {
      // ignore
    }
    await new Promise(resolve => setTimeout(resolve, 200));
    timeout -= 200;
    if (timeout <= 0) {
      throw new Error('Timeout:' + endpoint + ' not ready');
    }
  }
}

export const mochaHooks = {
  async beforeEach(this: ServerContext & Mocha.Context) {
    this.client = new APIClient(ENV.common.BASE_URL);
    this.client.accessToken = 'superadmin';
    this.authService.stderr = '';
    this.authService.stdout = '';
    this.deviceService.stderr = '';
    this.deviceService.stdout = '';
    this.experimentService.stderr = '';
    this.experimentService.stdout = '';
    this.federationService.stderr = '';
    this.federationService.stdout = '';
    this.gatewayService.stderr = '';
    this.gatewayService.stdout = '';
    this.bookingBackend.stderr = '';
    this.bookingBackend.stdout = '';
    this.bookingFrontend.stderr = '';
    this.bookingFrontend.stdout = '';
    this.deviceReservation.stderr = '';
    this.deviceReservation.stdout = '';
    this.scheduleService.stderr = '';
    this.scheduleService.stdout = '';
  },

  async beforeAll(this: ServerContext & Mocha.Context) {
    this.timeout(0);

    this.authService = start_service('auth', {...ENV.common, ...ENV.auth}, true, this.debug?.auth?.debug_port, this);
    this.deviceService = start_service('device', {...ENV.common, ...ENV.device}, true, this.debug?.device?.debug_port, this);
    this.experimentService = start_service(
      'experiment',
      {...ENV.common, ...ENV.experiment},
      true,
      this.debug?.experiment?.debug_port,
      this,
    );
    this.federationService = start_service(
      'federation',
      {...ENV.common, ...ENV.federation},
      true,
      this.debug?.federation?.debug_port,
      this,
    );
    this.bookingBackend = start_service('booking-backend', {...ENV.common, ...ENV['booking-backend']}, true, undefined, this);
    this.bookingFrontend = start_service('booking-frontend', {...ENV.common, ...ENV['booking-frontend']}, true, undefined, this);
    this.deviceReservation = start_service('device-reservation', {...ENV.common, ...ENV['device-reservation']}, true, undefined, this);
    this.scheduleService = start_service('schedule-service', {...ENV.common, ...ENV['schedule-service']}, true, undefined, this);
    this.gatewayService = start_gateway(path.resolve(repository_dir, 'services', 'gateway'), {...ENV.common, ...ENV.gateway}, this);

    await Promise.all([
      wait_for_health_check(ENV.common.BASE_URL + '/gateway/status'),
      wait_for_health_check(ENV.common.BASE_URL + '/auth/status'),
      wait_for_health_check(ENV.common.BASE_URL + '/device/status'),
      wait_for_health_check(ENV.common.BASE_URL + '/experiment/status'),
      wait_for_health_check(ENV.common.BASE_URL + '/federation/status'),
    ]);
  },

  async afterAll(this: ServerContext & Mocha.Context) {
    this.authService.process.kill();
    this.deviceService.process.kill();
    this.experimentService.process.kill();
    this.federationService.process.kill();
    this.gatewayService.process.kill();
    this.bookingBackend.process.kill();
    this.bookingFrontend.process.kill();
    this.deviceReservation.process.kill();
    this.scheduleService.process.kill();
  },
};
