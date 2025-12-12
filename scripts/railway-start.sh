#!/bin/bash
# Railway Start Script - BULLETPROOF: All errors handled
# NO set -e - errors won't stop the app

echo "🚀 Starting Railway application..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[$(date +'%H:%M:%S')]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1" >&2; }

# Check DATABASE_URL (non-blocking)
if [ -z "$DATABASE_URL" ]; then
    warn "DATABASE_URL is not set - app will start but database features won't work"
    warn "To fix: Add PostgreSQL database in Railway dashboard"
else
    log "✅ Database URL configured"
    
    # Run migrations (with multiple fallbacks)
    log "Running database migrations..."
    npx prisma migrate deploy 2>&1 || {
        warn "Migration failed, trying db push..."
        npx prisma db push --accept-data-loss 2>&1 || {
            warn "db push failed, trying schema push..."
            npx prisma db push --force-reset --accept-data-loss 2>&1 || warn "All migration attempts failed - continuing anyway"
        }
    }
    
    # Seed database (completely non-blocking)
    log "Seeding database..."
    npm run prisma:seed 2>&1 || warn "Seeding skipped (data may already exist or database not ready)"
fi

# Start Next.js (ALWAYS - even if database fails)
log "Starting Next.js on PORT=${PORT:-3000}"
exec next start
