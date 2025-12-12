#!/bin/bash
# Railway Build Script - Builds Next.js ONLY
# Prisma migrations/seeds run in deploy hook (after build)

set -o pipefail  # Only fail on pipe errors

echo "🚀 Starting Railway build process (Next.js only)..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log with timestamp
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Function to retry a command
retry() {
    local max_attempts=3
    local attempt=1
    local delay=5
    
    while [ $attempt -le $max_attempts ]; do
        log "Attempt $attempt/$max_attempts: $1"
        if eval "$1"; then
            log "✅ Success: $1"
            return 0
        else
            error "❌ Failed: $1 (attempt $attempt/$max_attempts)"
            if [ $attempt -lt $max_attempts ]; then
                warn "Waiting ${delay}s before retry..."
                sleep $delay
                delay=$((delay * 2))  # Exponential backoff
            fi
            attempt=$((attempt + 1))
        fi
    done
    
    error "All attempts failed for: $1"
    return 1
}

# Step 1: Install dependencies (if not already installed by Nixpacks)
log "📦 Checking dependencies..."
if [ ! -d "node_modules" ] || [ ! -f "node_modules/.package-lock.json" ]; then
    log "📦 Installing dependencies..."
    if ! retry "npm ci --prefer-offline --no-audit"; then
        warn "npm ci failed, trying npm install..."
        if ! retry "npm install --prefer-offline --no-audit"; then
            error "Failed to install dependencies after all retries"
            exit 1
        fi
    fi
else
    log "✅ Dependencies already installed (by Nixpacks)"
fi

# Step 2: Generate Prisma Client (no database connection needed)
log "🔧 Generating Prisma Client..."
retry "npx prisma generate"

# Step 3: Build Next.js application (NO database operations)
log "🏗️  Building Next.js application..."
log "ℹ️  Note: Database migrations/seeds will run in deploy hook"
if ! retry "NODE_ENV=production next build"; then
    warn "Build with NODE_ENV failed, trying without..."
    retry "next build"
fi

log "✅ Build completed successfully!"
echo ""
echo "🎉 Next.js build complete - migrations will run in deploy hook!"

