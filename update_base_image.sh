#!/bin/bash
set -e

# build base image
base_image="kubeagi/ops-console-base:main"

docker build -t ${base_image} -f base.dockerfile --secret id=npmrc,src=$HOME/.npmrc .

# push base image
docker push ${base_image}
