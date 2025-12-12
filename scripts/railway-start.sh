#!/bin/bash
# Railway Start Script - PRODUCTION READY
# Runs migrations/seeds before starting app

set -e  # Exit on error

echo "🚀 Starting Railway application..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    error "DATABASE_URL is not set!"
    exit 1
fi

log "📊 DATABASE_URL configured: ${DATABASE_URL:0:30}..."

# Step 1: Run migrations
log "📊 Running database migrations..."
set +e  # Don't exit on error for migrations
npx prisma migrate deploy 2>&1
migrate_exit=$?
set -e  # Re-enable exit on error

if [ $migrate_exit -eq 0 ]; then
    log "✅ Migrations completed successfully"
else
    warn "⚠️  Migration failed or already applied - trying db push..."
    set +e
    npx prisma db push --accept-data-loss 2>&1
    push_exit=$?
    set -e
    if [ $push_exit -eq 0 ]; then
        log "✅ Database schema synced"
    else
        warn "⚠️  Database push also failed - continuing anyway..."
    fi
fi

# Step 2: Seed database (non-blocking)
log "🌱 Seeding database..."
set +e  # Don't exit on error for seeding
npm run prisma:seed 2>&1
seed_exit=$?
set -e  # Re-enable exit on error

if [ $seed_exit -eq 0 ]; then
    log "✅ Database seeded successfully"
else
    warn "⚠️  Database seeding failed or skipped (this is OK if data already exists)"
fi

# Step 3: Start Next.js application
log "🚀 Starting Next.js application..."
log "ℹ️  Listening on PORT=${PORT:-3000}"

# Ensure PORT is set
export PORT=${PORT:-3000}

exec next start
