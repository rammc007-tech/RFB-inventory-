#!/bin/bash
# Railway Start Script - Runs migrations/seeds before starting app

set -e  # Exit on error

echo "🚀 Starting Railway application..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Step 1: Run migrations (when DATABASE_URL is available)
log "📊 Running database migrations..."
if npx prisma migrate deploy; then
    log "✅ Migrations completed successfully"
else
    warn "⚠️  Migration failed or already applied - continuing..."
fi

# Step 2: Seed database (non-blocking)
log "🌱 Seeding database..."
set +e  # Don't exit on error for seeding
npm run prisma:seed 2>&1
seed_exit_code=$?
set -e  # Re-enable exit on error

if [ $seed_exit_code -eq 0 ]; then
    log "✅ Database seeded successfully"
else
    warn "⚠️  Database seeding failed or skipped (this is OK if data already exists)"
fi

# Step 3: Start Next.js application
log "🚀 Starting Next.js application..."
log "ℹ️  Next.js will listen on PORT=${PORT:-3000} (Railway provides PORT)"
exec next start

