#!/bin/bash

# Fully Automated Deployment Script
# This will do as much as possible automatically

echo "🚀 RFB Inventory - Fully Automated Deployment"
echo "=============================================="
echo ""

cd "/Users/ramelumalai/RFB Inventory 1" || exit 1

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "📦 Installing GitHub CLI..."
    echo ""
    
    # Check for Homebrew
    if command -v brew &> /dev/null; then
        echo "✅ Homebrew found. Installing GitHub CLI..."
        brew install gh
    else
        echo "❌ Homebrew not found."
        echo ""
        echo "Please install Homebrew first:"
        echo "Run this command in Terminal:"
        echo '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
        echo ""
        echo "After installing Homebrew, run this script again."
        exit 1
    fi
fi

echo ""
echo "🔐 Checking GitHub authentication..."
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub..."
    echo "A browser window will open. Please authorize the app."
    gh auth login
else
    echo "✅ Already logged in to GitHub"
fi

echo ""
echo "📦 Creating repository 'rfb-inventory' on GitHub..."
echo ""

# Create repository and push code
gh repo create rfb-inventory --public --source=. --remote=origin --push --description "RFB Inventory & Production System"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Repository created and code pushed!"
    echo ""
    REPO_URL="https://github.com/rammc007-tech/rfb-inventory"
    echo "🔗 Repository: $REPO_URL"
    echo ""
    echo "📋 Next: Deploy to Vercel"
    echo "1. Open: https://vercel.com/new"
    echo "2. Import repository: rfb-inventory"
    echo "3. Add environment variables (see SIMPLE_DEPLOY.md)"
    echo "4. Deploy!"
    echo ""
    
    # Try to open the repository in browser
    if command -v open &> /dev/null; then
        open "$REPO_URL"
    fi
else
    echo ""
    echo "❌ Error creating repository."
    echo "Please check:"
    echo "1. Are you logged in to GitHub?"
    echo "2. Does repository 'rfb-inventory' already exist?"
    echo ""
    echo "If repository already exists, run:"
    echo "  git remote add origin https://github.com/rammc007-tech/rfb-inventory.git"
    echo "  git branch -M main"
    echo "  git push -u origin main"
fi

