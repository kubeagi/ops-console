# dockerfile of base image
FROM --platform=linux/amd64 node:18.16-alpine

# If you have native dependencies, you'll need extra tools
RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
  && apk update --no-cache && apk add --no-cache bash git openssh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies modules
COPY package.json /usr/src/app/
COPY pnpm-lock.yaml /usr/src/app/
COPY .npmrc /usr/src/app/
RUN npm set //dev-npm.tenxcloud.net/:_authToken="pswHLzvzEb0OM8RTvqW6dApj44PF8ZGajEmAVUgeQxs=" \
  && npm i pnpm @antfu/ni -g \
  && ni
