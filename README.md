
# CI Status

The following table shows the status for all jobs in this repository.

> **Important** The README.md must be updated whenever the branch is switched.
> This can be done by running `scripts/housekeeping.sh`. For your convenience
> this script can be run as pre-commit hook. Run `scripts/install-hooks.sh` to
> install the hook.

[//]: # ({{print badges}})

|     | build-spec | build | lint | test | lint-spec | build-docker |
| --- | --- | --- | --- | --- | --- | --- |
| helper/development-container |   | [![build](https://ci.goldi-labs.de/crosslab/nak/helper/development-container/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/development-container/dist/build.log) |  |  |  |  |
| helper/tsdoc-theme |   | [![build](https://ci.goldi-labs.de/crosslab/nak/helper/tsdoc-theme/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/tsdoc-theme/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/helper/tsdoc-theme/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/tsdoc-theme/dist/lint.log) |  |  |  |
| helper/openapi-codegeneration |   | [![build](https://ci.goldi-labs.de/crosslab/nak/helper/openapi-codegeneration/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/openapi-codegeneration/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/helper/openapi-codegeneration/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/openapi-codegeneration/dist/lint.log) |  |  |  |
| helper/crosslab-typescript-addon |   | [![build](https://ci.goldi-labs.de/crosslab/nak/helper/crosslab-typescript-addon/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/crosslab-typescript-addon/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/helper/crosslab-typescript-addon/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/crosslab-typescript-addon/dist/lint.log) |  |  |  |
| helper/dummy-device/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/js/dist/lint.log) |  |  |  |
| helper/dummy-device/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/helper/dummy-device/python/dist/lint.log) |  |  |  |
| services/common |   | [![build](https://ci.goldi-labs.de/crosslab/nak/services/common/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/common/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/services/common/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/services/common/dist/lint.log) |  |  |  |
| services/auth |  [![build-spec](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/lint.log) |  | [![lint-spec](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/lint-spec.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/nak/services/auth/dist/build-docker.log) |
| services/booking |  [![build-spec](https://ci.goldi-labs.de/crosslab/nak/services/booking/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/booking/dist/build-spec.log) |  |  |  | [![lint-spec](https://ci.goldi-labs.de/crosslab/nak/services/booking/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/booking/dist/lint-spec.log) |  |
| services/device |  [![build-spec](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/build.log) |  |  | [![lint-spec](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/lint-spec.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/nak/services/device/dist/build-docker.log) |
| services/experiment |  [![build-spec](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/lint.log) |  | [![lint-spec](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/lint-spec.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/nak/services/experiment/dist/build-docker.log) |
| services/federation |  [![build-spec](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/build.log) |  |  | [![lint-spec](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/lint-spec.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/nak/services/federation/dist/build-docker.log) |
| services/update |  [![build-spec](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/build-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/build-spec.log) | [![build](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/build.log) |  |  | [![lint-spec](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/lint-spec.badge)](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/lint-spec.log) | [![build-docker](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/nak/services/update/dist/build-docker.log) |
| services/openapi |   | [![build](https://ci.goldi-labs.de/crosslab/nak/services/openapi/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/openapi/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/services/openapi/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/services/openapi/dist/lint.log) |  |  |  |
| services/gateway |   | [![build](https://ci.goldi-labs.de/crosslab/nak/services/gateway/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/services/gateway/dist/build.log) |  |  |  | [![build-docker](https://ci.goldi-labs.de/crosslab/nak/services/gateway/dist/build-docker.badge)](https://ci.goldi-labs.de/crosslab/nak/services/gateway/dist/build-docker.log) |
| clients/api/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/api/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/api/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/api/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/api/js/dist/lint.log) |  |  |  |
| clients/api/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/api/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/api/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/api/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/api/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/nak/clients/api/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/api/python/dist/test.log) |  |  |
| clients/soa/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/nak/clients/soa/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa/python/dist/test.log) |  |  |
| clients/soa/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa/js/dist/lint.log) |  |  |  |
| clients/soa_services/electricalConnection/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/python/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/python/dist/test.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/python/dist/test.log) |  |  |
| clients/soa_services/electricalConnection/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/electricalConnection/js/dist/lint.log) |  |  |  |
| clients/soa_services/webcam/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/python/dist/lint.log) |  |  |  |
| clients/soa_services/webcam/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/webcam/js/dist/lint.log) |  |  |  |
| clients/soa_services/file/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/python/dist/lint.log) |  |  |  |
| clients/soa_services/file/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/file/js/dist/lint.log) |  |  |  |
| clients/soa_services/message/python |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/python/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/python/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/python/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/python/dist/lint.log) |  |  |  |
| clients/soa_services/message/js |   | [![build](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/js/dist/build.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/js/dist/build.log) | [![lint](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/js/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/clients/soa_services/message/js/dist/lint.log) |  |  |  |
| integration-test |   |  | [![lint](https://ci.goldi-labs.de/crosslab/nak/integration-test/dist/lint.badge)](https://ci.goldi-labs.de/crosslab/nak/integration-test/dist/lint.log) | [![test](https://ci.goldi-labs.de/crosslab/nak/integration-test/dist/test.badge)](https://ci.goldi-labs.de/crosslab/nak/integration-test/dist/test.log) |  |  |

[//]: # ({{end}})




[//]: # ({{print dependency graph}})
```mermaid
graph LR
%%{init:{'flowchart':{'nodeSpacing': 20, 'rankSpacing': 80, 'curve': 'linear', 'useMaxWidth': false}}}%%
  subgraph clients/api/js
    clients/api/js:build[build]
    clients/api/js:lint[lint]
  end
  subgraph clients/api/python
    clients/api/python:build[build]
    clients/api/python:lint[lint]
    clients/api/python:test[test]
  end
  subgraph clients/soa/js
    clients/soa/js:build[build]
    clients/soa/js:lint[lint]
  end
  subgraph clients/soa/python
    clients/soa/python:build[build]
    clients/soa/python:lint[lint]
    clients/soa/python:test[test]
  end
  subgraph clients/soa_services/electricalConnection/js
    clients/soa_services/electricalConnection/js:build[build]
    clients/soa_services/electricalConnection/js:lint[lint]
  end
  subgraph clients/soa_services/electricalConnection/python
    clients/soa_services/electricalConnection/python:build[build]
    clients/soa_services/electricalConnection/python:lint[lint]
    clients/soa_services/electricalConnection/python:test[test]
  end
  subgraph clients/soa_services/file/js
    clients/soa_services/file/js:build[build]
    clients/soa_services/file/js:lint[lint]
  end
  subgraph clients/soa_services/file/python
    clients/soa_services/file/python:build[build]
    clients/soa_services/file/python:lint[lint]
  end
  subgraph clients/soa_services/message/js
    clients/soa_services/message/js:build[build]
    clients/soa_services/message/js:lint[lint]
  end
  subgraph clients/soa_services/message/python
    clients/soa_services/message/python:build[build]
    clients/soa_services/message/python:lint[lint]
  end
  subgraph clients/soa_services/webcam/js
    clients/soa_services/webcam/js:build[build]
    clients/soa_services/webcam/js:lint[lint]
  end
  subgraph clients/soa_services/webcam/python
    clients/soa_services/webcam/python:build[build]
    clients/soa_services/webcam/python:lint[lint]
  end
  subgraph helper/crosslab-typescript-addon
    helper/crosslab-typescript-addon:build[build]
    helper/crosslab-typescript-addon:lint[lint]
  end
  subgraph helper/development-container
    helper/development-container:build[build]
  end
  subgraph helper/dummy-device/js
    helper/dummy-device/js:build[build]
    helper/dummy-device/js:lint[lint]
  end
  subgraph helper/dummy-device/python
    helper/dummy-device/python:build[build]
    helper/dummy-device/python:lint[lint]
  end
  subgraph helper/openapi-codegeneration
    helper/openapi-codegeneration:build[build]
    helper/openapi-codegeneration:lint[lint]
  end
  subgraph helper/tsdoc-theme
    helper/tsdoc-theme:build[build]
    helper/tsdoc-theme:lint[lint]
  end
  subgraph integration-test
    integration-test:lint[lint]
    integration-test:test[test]
  end
  subgraph services/auth
    services/auth:build[build]
    services/auth:build-docker[build-docker]
    services/auth:build-spec[build-spec]
    services/auth:lint[lint]
    services/auth:lint-spec[lint-spec]
  end
  subgraph services/booking
    services/booking:build-spec[build-spec]
    services/booking:lint-spec[lint-spec]
  end
  subgraph services/common
    services/common:build[build]
    services/common:lint[lint]
  end
  subgraph services/device
    services/device:build[build]
    services/device:build-docker[build-docker]
    services/device:build-spec[build-spec]
    services/device:lint-spec[lint-spec]
  end
  subgraph services/experiment
    services/experiment:build[build]
    services/experiment:build-docker[build-docker]
    services/experiment:build-spec[build-spec]
    services/experiment:lint[lint]
    services/experiment:lint-spec[lint-spec]
  end
  subgraph services/federation
    services/federation:build[build]
    services/federation:build-docker[build-docker]
    services/federation:build-spec[build-spec]
    services/federation:lint-spec[lint-spec]
  end
  subgraph services/gateway
    services/gateway:build[build]
    services/gateway:build-docker[build-docker]
  end
  subgraph services/openapi
    services/openapi:build[build]
    services/openapi:lint[lint]
  end
  subgraph services/update
    services/update:build[build]
    services/update:build-docker[build-docker]
    services/update:build-spec[build-spec]
    services/update:lint-spec[lint-spec]
  end
  services/auth:build-spec[build-spec] --> clients/api/js:build[build]
  services/booking:build-spec[build-spec] --> clients/api/js:build[build]
  services/device:build-spec[build-spec] --> clients/api/js:build[build]
  services/experiment:build-spec[build-spec] --> clients/api/js:build[build]
  services/federation:build-spec[build-spec] --> clients/api/js:build[build]
  services/update:build-spec[build-spec] --> clients/api/js:build[build]
  helper/crosslab-typescript-addon:build[build] --> clients/api/js:build[build]
  helper/tsdoc-theme:build[build] --> clients/api/js:build[build]
  helper/openapi-codegeneration:build[build] --> clients/api/js:build[build]
  clients/api/js:build[build] --> clients/api/js:lint[lint]
  services/openapi:build[build] --> clients/api/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/api/python:build[build]
  clients/api/python:build[build] --> clients/api/python:lint[lint]
  clients/api/python:build[build] --> clients/api/python:test[test]
  clients/soa/js:build[build] --> clients/soa/js:lint[lint]
  services/openapi:build[build] --> clients/soa/python:build[build]
  helper/openapi-codegeneration:build[build] --> clients/soa/python:build[build]
  clients/api/python:build[build] --> clients/soa/python:build[build]
  clients/soa/python:build[build] --> clients/soa/python:lint[lint]
  clients/soa/python:build[build] --> clients/soa/python:test[test]
  clients/soa/js:build[build] --> clients/soa_services/electricalConnection/js:build[build]
  clients/soa_services/electricalConnection/js:build[build] --> clients/soa_services/electricalConnection/js:lint[lint]
  helper/openapi-codegeneration:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/api/python:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/electricalConnection/python:build[build]
  clients/soa_services/electricalConnection/python:build[build] --> clients/soa_services/electricalConnection/python:lint[lint]
  clients/soa_services/electricalConnection/python:build[build] --> clients/soa_services/electricalConnection/python:test[test]
  clients/soa/js:build[build] --> clients/soa_services/file/js:build[build]
  clients/soa_services/file/js:build[build] --> clients/soa_services/file/js:lint[lint]
  clients/api/python:build[build] --> clients/soa_services/file/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/file/python:build[build]
  clients/soa_services/file/python:build[build] --> clients/soa_services/file/python:lint[lint]
  clients/soa/js:build[build] --> clients/soa_services/message/js:build[build]
  clients/soa_services/message/js:build[build] --> clients/soa_services/message/js:lint[lint]
  clients/api/python:build[build] --> clients/soa_services/message/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/message/python:build[build]
  clients/soa_services/message/python:build[build] --> clients/soa_services/message/python:lint[lint]
  clients/soa/js:build[build] --> clients/soa_services/webcam/js:build[build]
  clients/soa_services/webcam/js:build[build] --> clients/soa_services/webcam/js:lint[lint]
  clients/api/python:build[build] --> clients/soa_services/webcam/python:build[build]
  clients/soa/python:build[build] --> clients/soa_services/webcam/python:build[build]
  clients/soa_services/webcam/python:build[build] --> clients/soa_services/webcam/python:lint[lint]
  helper/openapi-codegeneration:build[build] --> helper/crosslab-typescript-addon:build[build]
  helper/crosslab-typescript-addon:build[build] --> helper/crosslab-typescript-addon:lint[lint]
  clients/api/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa_services/electricalConnection/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa_services/file/js:build[build] --> helper/dummy-device/js:build[build]
  clients/soa_services/webcam/js:build[build] --> helper/dummy-device/js:build[build]
  helper/dummy-device/js:build[build] --> helper/dummy-device/js:lint[lint]
  clients/api/python:build[build] --> helper/dummy-device/python:build[build]
  clients/soa/python:build[build] --> helper/dummy-device/python:build[build]
  clients/soa_services/electricalConnection/python:build[build] --> helper/dummy-device/python:build[build]
  helper/dummy-device/python:build[build] --> helper/dummy-device/python:lint[lint]
  helper/openapi-codegeneration:build[build] --> helper/openapi-codegeneration:lint[lint]
  helper/tsdoc-theme:build[build] --> helper/tsdoc-theme:lint[lint]
  integration-test:test[test] --> integration-test:lint[lint]
  services/common:build[build] --> integration-test:test[test]
  services/auth:build[build] --> integration-test:test[test]
  services/device:build[build] --> integration-test:test[test]
  services/experiment:build[build] --> integration-test:test[test]
  services/federation:build[build] --> integration-test:test[test]
  clients/api/js:build[build] --> integration-test:test[test]
  clients/soa/js:build[build] --> integration-test:test[test]
  clients/soa_services/electricalConnection/js:build[build] --> integration-test:test[test]
  helper/dummy-device/js:build[build] --> integration-test:test[test]
  helper/dummy-device/python:build[build] --> integration-test:test[test]
  services/auth:build-spec[build-spec] --> services/auth:build[build]
  services/common:build[build] --> services/auth:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/auth:build[build]
  helper/openapi-codegeneration:build[build] --> services/auth:build[build]
  clients/api/js:build[build] --> services/auth:build[build]
  services/auth:build[build] --> services/auth:build-docker[build-docker]
  services/auth:build[build] --> services/auth:lint[lint]
  services/auth:build-spec[build-spec] --> services/auth:lint-spec[lint-spec]
  services/booking:build-spec[build-spec] --> services/booking:lint-spec[lint-spec]
  services/common:build[build] --> services/common:lint[lint]
  services/device:build-spec[build-spec] --> services/device:build[build]
  services/common:build[build] --> services/device:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/device:build[build]
  helper/openapi-codegeneration:build[build] --> services/device:build[build]
  clients/api/js:build[build] --> services/device:build[build]
  services/device:build[build] --> services/device:build-docker[build-docker]
  services/device:build-spec[build-spec] --> services/device:lint-spec[lint-spec]
  services/experiment:build-spec[build-spec] --> services/experiment:build[build]
  services/common:build[build] --> services/experiment:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/experiment:build[build]
  helper/openapi-codegeneration:build[build] --> services/experiment:build[build]
  clients/api/js:build[build] --> services/experiment:build[build]
  services/experiment:build[build] --> services/experiment:build-docker[build-docker]
  services/experiment:build[build] --> services/experiment:lint[lint]
  services/experiment:build-spec[build-spec] --> services/experiment:lint-spec[lint-spec]
  services/federation:build-spec[build-spec] --> services/federation:build[build]
  services/common:build[build] --> services/federation:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/federation:build[build]
  helper/openapi-codegeneration:build[build] --> services/federation:build[build]
  clients/api/js:build[build] --> services/federation:build[build]
  services/federation:build[build] --> services/federation:build-docker[build-docker]
  services/federation:build-spec[build-spec] --> services/federation:lint-spec[lint-spec]
  services/gateway:build[build] --> services/gateway:build-docker[build-docker]
  services/auth:build-spec[build-spec] --> services/openapi:build[build]
  services/booking:build-spec[build-spec] --> services/openapi:build[build]
  services/device:build-spec[build-spec] --> services/openapi:build[build]
  services/experiment:build-spec[build-spec] --> services/openapi:build[build]
  services/federation:build-spec[build-spec] --> services/openapi:build[build]
  services/update:build-spec[build-spec] --> services/openapi:build[build]
  services/openapi:build[build] --> services/openapi:lint[lint]
  services/update:build-spec[build-spec] --> services/update:build[build]
  services/common:build[build] --> services/update:build[build]
  helper/crosslab-typescript-addon:build[build] --> services/update:build[build]
  helper/openapi-codegeneration:build[build] --> services/update:build[build]
  clients/api/js:build[build] --> services/update:build[build]
  services/update:build[build] --> services/update:build-docker[build-docker]
  services/update:build-spec[build-spec] --> services/update:lint-spec[lint-spec]
```
[//]: # ({{end}})


## Publishing

run `./scripts/ci.sh --release`

Create `$HOME/.pypirc` with the following content:
```
[pypi]
    username: XXXXXX
    password: xxxxxxxxxxxxxxxx
```

run `./scripts/publish.sh --latest`