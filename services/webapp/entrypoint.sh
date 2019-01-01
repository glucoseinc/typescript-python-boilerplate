#!/bin/sh
set -e

./wait_host.sh redis 6379
exec typescript-python-boilerplate "$@"
