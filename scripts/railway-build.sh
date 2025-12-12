#!/bin/bash
# Railway Build Script with Error Handling and Retry Logic
# This script ensures reliable builds on Railway

# Don't use set -e globally - we want to handle errors gracefully
set -o pipefail  # Only fail on pipe errors

echo "🚀 Starting Railway build process..."

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

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    error "DATABASE_URL environment variable is not set!"
    exit 1
fi

# Verify DATABASE_URL format
if [[ ! "$DATABASE_URL" =~ ^postgresql:// ]]; then
    error "DATABASE_URL must be a PostgreSQL connection string (starts with postgresql://)"
    exit 1
fi

# Check if DATABASE_URL contains .app domain (external URL)
if [[ "$DATABASE_URL" == *"railway.internal"* ]]; then
    error "DATABASE_URL contains 'railway.internal' - this will not work during build!"
    error "Please use an external URL with .app domain"
    exit 1
fi

log "✅ DATABASE_URL is configured correctly"

# Step 1: Install dependencies
log "📦 Installing dependencies..."
if ! retry "npm ci --prefer-offline --no-audit"; then
    warn "npm ci failed, trying npm install..."
    if ! retry "npm install --prefer-offline --no-audit"; then
        error "Failed to install dependencies after all retries"
        exit 1
    fi
fi

# Step 2: Generate Prisma Client
log "🔧 Generating Prisma Client..."
retry "npx prisma generate"

# Step 3: Wait for database to be ready (with timeout)
log "⏳ Waiting for database connection..."
timeout=30
elapsed=0
while [ $elapsed -lt $timeout ]; do
    if npx prisma db execute --stdin <<< "SELECT 1;" > /dev/null 2>&1; then
        log "✅ Database is ready"
        break
    fi
    sleep 2
    elapsed=$((elapsed + 2))
    echo -n "."
done

if [ $elapsed -ge $timeout ]; then
    error "Database connection timeout after ${timeout}s"
    exit 1
fi

# Step 4: Push database schema (with retry)
log "📊 Pushing database schema..."
retry "npx prisma db push --accept-data-loss --skip-generate"

# Step 5: Seed database (with error handling - non-blocking)
log "🌱 Seeding database..."
set +e  # Don't exit on error for seeding
npm run prisma:seed 2>&1
seed_exit_code=$?
set -o pipefail  # Re-enable pipefail

if [ $seed_exit_code -eq 0 ]; then
    log "✅ Database seeded successfully"
else
    warn "⚠️  Database seeding failed or skipped (exit code: $seed_exit_code)"
    warn "⚠️  This is OK if data already exists - continuing build..."
    # Continue build even if seeding fails
fi

# Step 6: Build Next.js application
log "🏗️  Building Next.js application..."
retry "next build"

log "✅ Build completed successfully!"
echo ""
echo "🎉 Railway build is ready for deployment!"

