FROM 172.22.50.223/dev-branch/kubeagi-portal-dist:main as kubeagi-portal

FROM 172.22.96.119/front-end/nginx:stable

COPY --from=kubeagi-portal /build-files/KubeAGI-public /usr/share/nginx/static/KubeAGI-public
ADD default.conf /etc/nginx/conf.d/
