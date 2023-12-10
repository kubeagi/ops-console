FROM kubeagi/portal-base:main as builder
COPY . /usr/src/app/
RUN cp config/api.sample.ts config/api.ts && \
  npm run build && \
  mv dist/kubeagi-portal-public /tmp/kubeagi-portal-public

FROM kubeagi/busybox
COPY --from=builder /tmp/kubeagi-portal-public /build-files/kubeagi-portal-public
