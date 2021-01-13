#!/usr/bin/env bash

set -x
set -e
set -u
set -o pipefail

if [ -z "$INFURA_PROJECT_ID" ];
  then echo "Infura project ID not found." && exit 1;
fi

echo "INFURA_PROJECT_ID=${INFURA_PROJECT_ID}" >> .infurarc
