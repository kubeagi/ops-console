# build base
FROM node:18.19-alpine as base
RUN apk add --no-cache bash git openssh
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV NODE_OPTIONS --max_old_space_size=10240
COPY package.json /usr/src/app/
COPY pnpm-lock.yaml /usr/src/app/
COPY .npmrc /usr/src/app/
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm i pnpm @antfu/ni -g && ni

# build dist
FROM base as builder
COPY . /usr/src/app/
RUN cp config/api.sample.ts config/api.ts && \
  npm run build && \
  mv dist/kubeagi-portal-public /tmp/kubeagi-portal-public && \
  if ls .gitdiff 1>/dev/null 2>&1; then \
    mv .gitdiff /tmp/kubeagi-portal-public/; \
  fi && \
  if ls .gitversion 1>/dev/null 2>&1; then \
    mv .gitversion /tmp/kubeagi-portal-public/; \
  fi

# build final image
FROM nginx:stable
COPY --from=builder /tmp/kubeagi-portal-public /usr/share/nginx/static/kubeagi-portal-public
ADD default.conf /etc/nginx/conf.d/
