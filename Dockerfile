# ---------------------------------------------------------
# 1) Build Stage (Safe, No Cache Lock, No EBUSY)
# ---------------------------------------------------------
FROM node:18 AS builder
WORKDIR /app

# Copy only dependency files
COPY package.json package-lock.json ./

# Install dependencies safely (no locked cache)
RUN npm set cache /tmp/empty-cache --global
RUN npm ci --prefer-offline --no-audit --no-fund

# Copy full project
COPY . .

# Generate prisma client
RUN npx prisma generate

# Next.js build with cache (safe)
RUN --mount=type=cache,target=/app/.next/cache \
    npm run build


# ---------------------------------------------------------
# 2) Production Image (Clean, Small, Fast)
# ---------------------------------------------------------
FROM node:18 AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only what is needed for runtime
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

# Generate Prisma Client in production image
RUN npx prisma generate

# Expose port
EXPOSE 3000

# Start command (will be overridden by Railway startCommand)
CMD ["npm", "start"]

