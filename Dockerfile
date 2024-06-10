FROM node:22.2-alpine3.20 AS stage
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN [ "npm","run","build" ]

FROM nginx:1.25.1-alpine3.17-slim as production
COPY --from=stage --chown=nginx:nginx /app/dist/ /usr/share/nginx/html
COPY --from=stage --chown=nginx:nginx /app/env_replace.sh /
RUN chmod +x /env_replace.sh
COPY --chown=nginx:nginx ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["sh", "-c", "/env_replace.sh && nginx -g 'daemon off;'"]