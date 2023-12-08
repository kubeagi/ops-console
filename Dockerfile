# build dist
FROM kubeagi/portal-base:main as builder
COPY . /usr/src/app/
RUN cp config/api.sample.ts config/api.ts && \
  npm run build && \
  mv dist/kubeagi-portal-public /tmp/kubeagi-portal-public

# build final image
FROM nginx:stable
COPY --from=builder /tmp/kubeagi-portal-public /usr/share/nginx/static/kubeagi-portal-public
ADD default.conf /etc/nginx/conf.d/
