#!/bin/bash

echo "🚀 RFB Inventory - Automated Setup Script"
echo "=========================================="
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

echo "✅ Vercel CLI ready"
echo ""
echo "📋 This script will help you set up:"
echo "   1. Database connection"
echo "   2. Environment variables"
echo "   3. Deployment"
echo ""
echo "⚠️  Note: Some steps require manual input (database creation)"
echo "   But I'll guide you through the absolute minimum steps"
echo ""
echo "Let's start..."
