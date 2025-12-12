#!/bin/bash
# Nixpacks Build Script - Railway Environment Variables
# Railway automatically provides environment variables during build

set -e

echo "🚀 Starting Railway build process..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

# Step 1: Generate Prisma Client (no DB connection needed)
log "🔧 Generating Prisma Client..."
npx prisma generate 2>&1 || {
    warn "Prisma generate warning (continuing anyway)"
}

# Step 2: Build Next.js
# Railway environment variables are automatically available
log "🏗️ Building Next.js application..."
export NODE_ENV=production

# Use Railway's environment variables (already set in dashboard)
# If not set, use fallbacks for build only
export NEXTAUTH_URL="${NEXTAUTH_URL:-http://localhost:3000}"
export NEXTAUTH_SECRET="${NEXTAUTH_SECRET:-temp-secret-for-build-only}"
export DATABASE_URL="${DATABASE_URL:-postgresql://dummy:dummy@dummy:5432/dummy}"

log "Environment check:"
log "  NODE_ENV=${NODE_ENV}"
log "  NEXTAUTH_URL=${NEXTAUTH_URL}"
log "  DATABASE_URL=${DATABASE_URL:0:30}..." # Show first 30 chars only

# Build Next.js
if next build 2>&1; then
    log "✅ Build completed successfully!"
    exit 0
else
    error "❌ Build failed"
    exit 1
fi

