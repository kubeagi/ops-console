#!/bin/bash
set -e

image="yuntibuild/kubeagi-portal:0.1.0"

# 1.构建基础镜像
./update_base_image.sh $1

# 2.构建静态文件镜像
docker build -t kubeagi-portal-dist:main -f build.dockerfile .

# 3.将静态文件打包到 nginx 镜像中
docker build -t $image .

docker push $image
