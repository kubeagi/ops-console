# build dist
FROM node:18.19-alpine as builder
RUN apk add --no-cache bash git openssh
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV NODE_OPTIONS --max_old_space_size=10240
COPY . /usr/src/app/
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i pnpm @antfu/ni -g && ni
RUN cp config/api.sample.ts config/api.ts && \
  npm run build && \
  mv dist/kubeagi-portal-public /tmp/kubeagi-portal-public

# build final image
FROM nginx:stable
COPY --from=builder /tmp/kubeagi-portal-public /usr/share/nginx/static/kubeagi-portal-public
ADD default.conf /etc/nginx/conf.d/
