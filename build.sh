#!/bin/bash
set -e

image="172.22.50.223/dev-branch/kubeagi-portal:main"

# 1.构建基础镜像
./update_base_image.sh

# 2.构建静态文件镜像
docker build -t 172.22.50.223/dev-branch/kubeagi-portal-dist:main -f build.dockerfile .

# 3.将静态文件打包到 nginx 镜像中
docker build -t $image .

docker push $image
