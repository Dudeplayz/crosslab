#!/bin/bash

REPOSITORY=admin@ci.goldi-labs.de:/data/www/ci/crosslab
WEB_REPOSITORY=https://ci.goldi-labs.de/crosslab

SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
$SCRIPT_DIR/helper/ci.sh --repository $REPOSITORY --web-repository $WEB_REPOSITORY $@