FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_URL=https://canmurat.com
ARG BASE_PATH=/texturedublin
ARG PUBLIC_SITE_PREVIEW=true
ENV SITE_URL=$SITE_URL BASE_PATH=$BASE_PATH PUBLIC_SITE_PREVIEW=$PUBLIC_SITE_PREVIEW
RUN npm run build && npm run audit

FROM nginx:stable-alpine AS runtime
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html/texturedublin
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
