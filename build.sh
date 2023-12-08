#!/bin/bash
set -e

image="kubeagi/portal"

# 1.构建基础镜像
# ./update_base_image.sh

# 2.构建静态文件，并将静态文件打包到 nginx 镜像中
docker build -t $image .

# docker push $image
