FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_URL=https://canmurat.com
ARG BASE_PATH=/texturedublin
ARG PUBLIC_SITE_PREVIEW=true
ENV SITE_URL=$SITE_URL BASE_PATH=$BASE_PATH PUBLIC_SITE_PREVIEW=$PUBLIC_SITE_PREVIEW
RUN npm run build && npm run audit && npm run test:admin

FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 DATA_DIR=/app/data BASE_PATH=/texturedublin
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && mkdir -p /app/data && chown node:node /app/data
COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1
CMD ["node", "server.mjs"]
