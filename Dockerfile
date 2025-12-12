FROM node:18 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm set cache /tmp/empty-cache --global
RUN npm ci --prefer-offline --no-audit --no-fund

COPY . .
RUN npx prisma generate
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build

FROM node:18 AS runner
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

CMD ["npm", "start"]

