#!/bin/bash
set -e

# build base image
base_image="kubeagi/portal-base:main"

docker build -t ${base_image} -f base.dockerfile --secret id=npmrc,src=$HOME/.npmrc .
# push base image
# docker push ${base_image}
