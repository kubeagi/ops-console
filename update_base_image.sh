#!/bin/bash
set -e

# build base image
base_image="172.22.96.119/front-end/kubeagi-portal-base:base-dev"

docker build -t ${base_image} -f base.dockerfile .
# push base image
# docker push ${base_image}
