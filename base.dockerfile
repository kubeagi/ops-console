# dockerfile of base image
FROM node:18.19-alpine

# If you have native dependencies, you'll need extra tools
RUN apk add --no-cache bash git openssh

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install dependencies modules
ADD .npmrc package.json pnpm-lock.yaml .pnpmfile.cjs pnpm-workspace.yaml ./
ADD packages ./packages
ADD patches ./patches
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i pnpm @antfu/ni -g && ni
