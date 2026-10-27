FROM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG SITE_URL=https://texturedublin.com
ARG BASE_PATH=/
ARG PUBLIC_SITE_PREVIEW=false
ARG PUBLIC_GA4_ID
ARG PUBLIC_EMAIL
ARG PUBLIC_GOOGLE_SITE_VERIFICATION
ARG PUBLIC_BING_SITE_VERIFICATION
ENV SITE_URL=$SITE_URL BASE_PATH=$BASE_PATH PUBLIC_SITE_PREVIEW=$PUBLIC_SITE_PREVIEW PUBLIC_GA4_ID=$PUBLIC_GA4_ID PUBLIC_EMAIL=$PUBLIC_EMAIL PUBLIC_GOOGLE_SITE_VERIFICATION=$PUBLIC_GOOGLE_SITE_VERIFICATION PUBLIC_BING_SITE_VERIFICATION=$PUBLIC_BING_SITE_VERIFICATION
RUN npm run build && npm run audit && npm run test:tracking

FROM node:24-alpine AS runtime
WORKDIR /app
ARG SITE_URL=https://texturedublin.com
ARG BASE_PATH=/
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0 BASE_PATH=$BASE_PATH SITE_URL=$SITE_URL LEGACY_SITE_URL=https://canmurat.com/texturedublin
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY --from=build /app/dist ./dist
COPY server.mjs ./server.mjs
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:3000/healthz || exit 1
CMD ["node", "server.mjs"]
