#!/bin/bash
# Railway Deployment Script
# This script helps deploy the RFB Inventory app to Railway

echo "🚂 Railway Deployment Helper"
echo "============================"
echo ""

# Check if Railway CLI is available
if ! command -v railway &> /dev/null && ! npx @railway/cli --version &> /dev/null; then
    echo "⚠️  Railway CLI not found globally"
    echo "   Using npx @railway/cli instead"
    RAILWAY_CMD="npx @railway/cli"
else
    RAILWAY_CMD="railway"
fi

echo "📦 Step 1: Checking Git status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  You have uncommitted changes"
    read -p "Do you want to commit and push? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add .
        git commit -m "Prepare for Railway deployment"
        git push origin main
        echo "✅ Changes pushed to GitHub"
    fi
else
    echo "✅ Git repository is clean"
fi

echo ""
echo "🔐 Step 2: Railway Authentication"
echo "   Opening Railway login page..."
open "https://railway.app/login"

echo ""
echo "📋 Next Steps (after logging in to Railway):"
echo ""
echo "1. Click 'New Project' in Railway dashboard"
echo "2. Select 'Deploy from GitHub repo'"
echo "3. Choose repository: rammc007-tech/RFB-inventory-"
echo "4. Railway will automatically detect Next.js and deploy"
echo ""
echo "5. Add PostgreSQL Database:"
echo "   - Click 'New' → 'Database' → 'Add PostgreSQL'"
echo "   - Railway will create database automatically"
echo ""
echo "6. Set Environment Variables (in Railway project → Settings → Variables):"
echo "   NEXTAUTH_URL=https://your-app-name.railway.app"
echo "   NEXTAUTH_SECRET=OXfuf0X/bdjtIkJZaS8y7tucPkj090T84WTi6xXCw8s="
echo ""
echo "7. Railway will automatically:"
echo "   - Build your app"
echo "   - Run database migrations"
echo "   - Seed the database"
echo "   - Deploy to production"
echo ""
echo "✅ Your app will be live at: https://your-app-name.railway.app"
echo ""
echo "📝 Default Login:"
echo "   Email: admin@rfb.com"
echo "   Password: admin123"
echo ""

