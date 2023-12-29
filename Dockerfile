FROM --platform=linux/amd64 kubeagi/ops-console-dist:main as dist
FROM nginx:stable
COPY --from=dist /build-files/kubeagi-portal-public /usr/share/nginx/static/kubeagi-portal-public
ADD default.conf /etc/nginx/conf.d/
