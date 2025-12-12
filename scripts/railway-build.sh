#!/bin/bash
# Railway Build Script - PRODUCTION READY
# Handles all edge cases and ensures successful builds

set -e  # Exit on any error

echo "🚀 Starting Railway build process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
    exit 1
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Step 1: Install dependencies
log "📦 Installing dependencies..."
if [ ! -d "node_modules" ]; then
    if ! npm ci --prefer-offline --no-audit 2>&1; then
        warn "npm ci failed, trying npm install..."
        npm install --prefer-offline --no-audit || error "Failed to install dependencies"
    fi
    log "✅ Dependencies installed"
else
    log "✅ Dependencies already installed"
fi

# Step 2: Generate Prisma Client (NO database connection needed)
log "🔧 Generating Prisma Client..."
if ! npx prisma generate 2>&1; then
    error "Failed to generate Prisma Client"
fi
log "✅ Prisma Client generated"

# Step 3: Build Next.js (NO database operations)
log "🏗️  Building Next.js application..."
export NODE_ENV=production

# Set fallback environment variables for build
export NEXTAUTH_URL="${NEXTAUTH_URL:-http://localhost:3000}"
export NEXTAUTH_SECRET="${NEXTAUTH_SECRET:-temporary-secret-for-build}"

if ! next build 2>&1; then
    error "Next.js build failed"
fi

log "✅ Build completed successfully!"
echo ""
echo "🎉 Railway build complete!"
echo "   • Dependencies: ✅"
echo "   • Prisma Client: ✅"
echo "   • Next.js Build: ✅"
echo ""
echo "📝 Note: Database migrations/seeds will run in start script"
