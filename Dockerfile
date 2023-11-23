FROM kubeagi-portal-dist:main as kubeagi-portal

FROM 172.22.96.119/front-end/nginx:stable

COPY --from=kubeagi-portal /build-files/kubeagi-portal-public /usr/share/nginx/static/kubeagi-portal-public
ADD default.conf /etc/nginx/conf.d/
