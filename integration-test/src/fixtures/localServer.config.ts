export const ENV = {
  common: {
    SECURITY_ISSUER: 'http://localhost',
    SECURITY_AUDIENCE: 'http://localhost',
    BASE_URL: 'http://localhost',
  },
  auth: {
    PORT: '3000',
    ALLOWLIST: [
      'superadmin:local:superadmin',
      'authservice:local:authservice',
      'deviceservice:local:deviceservice',
      'experimentservice:local:experimentservice',
      'federationservice:local:federationservice',
    ].join(','),
    API_TOKEN: 'authservice',
  },
  device: {
    PORT: '3001',
    API_TOKEN: 'deviceservice',
  },
  experiment: {
    PORT: '3002',
    API_TOKEN: 'experimentservice',
  },
  federation: {
    PORT: '3003',
    API_TOKEN: 'federationservice',
  },
  gateway: {
    AUTH_SERVICE_URL: '127.0.0.1:3000',
    DEVICE_SERVICE_URL: '127.0.0.1:3001',
    EXPERIMENT_SERVICE_URL: '127.0.0.1:3002',
    FEDERATION_SERVICE_URL: '127.0.0.1:3003',
    UPDATE_SERVICE_URL: '127.0.0.1:1',
    SERVER_NAME: 'localhost',
    NGINX_PID_PATH: 'nginx.pid',
  },
};
