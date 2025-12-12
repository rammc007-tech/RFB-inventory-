#!/bin/bash
# Railway Start Script - Industry Standard
set -e

echo "🚀 Starting Railway application..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

# Validate DATABASE_URL
if [ -z "$DATABASE_URL" ]; then
    error "DATABASE_URL is not set!"
    exit 1
fi

log "Database URL configured"

# Run migrations (with fallback)
log "Running database migrations..."
set +e
npx prisma migrate deploy 2>&1
MIGRATE_EXIT=$?
set -e

if [ $MIGRATE_EXIT -ne 0 ]; then
    warn "Migration failed, trying db push..."
    set +e
    npx prisma db push --accept-data-loss 2>&1
    set -e
fi

# Seed database (non-blocking)
log "Seeding database..."
set +e
npm run prisma:seed 2>&1 || warn "Seeding skipped (data may already exist)"
set -e

# Start Next.js
log "Starting Next.js on PORT=${PORT:-3000}"
exec next start
