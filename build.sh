#!/bin/bash
set -e

image="kubeagi/ops-console"

# 1.构建基础镜像
./update_base_image.sh

# 2.构建静态文件镜像
docker build -t kubeagi/ops-console-dist:main -f build.dockerfile .

# 3.将静态文件打包到 nginx 镜像中
docker build -t $image .

docker push $image
