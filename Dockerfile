ARG NODE_BASE_IMAGE=node:22.17.0-alpine3.22

########################  DEV STAGE  ########################
FROM ${NODE_BASE_IMAGE} AS dev
WORKDIR /app
RUN find /app -mindepth 1 -maxdepth 1 -exec rm -rf {} +

# Dependencias de Node
COPY package*.json ./
RUN npm ci --include=dev --ignore-scripts

########################  BUILD STAGE  ########################
FROM dev AS builder
ENV NODE_ENV=production

# Copiamos el código
COPY . .

# ----------  ARGs que llegan desde docker‑compose  ----------
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_SITE_URL
ARG INTERNAL_API_URL

# ----------  Vars necesarias en tiempo de build  ------------
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    INTERNAL_API_URL=$INTERNAL_API_URL \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

########################  RUNTIME STAGE  ######################
FROM ${NODE_BASE_IMAGE}
WORKDIR /app
RUN find /app -mindepth 1 -maxdepth 1 -exec rm -rf {} +

ENV NODE_ENV=production \
    PORT=3000 \
    NEXT_TELEMETRY_DISABLED=1

# Artefactos del build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

# Sólo dependencias de producción
RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]
