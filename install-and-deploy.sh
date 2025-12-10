#!/bin/bash

# Complete Automated Setup and Deployment
# This script will install everything needed and deploy automatically

set -e  # Exit on error

echo "🚀 RFB Inventory - Complete Automated Setup"
echo "==========================================="
echo ""

cd "/Users/ramelumalai/RFB Inventory 1" || exit 1

# Step 1: Install Homebrew (if not installed)
if ! command -v brew &> /dev/null; then
    echo "📦 Step 1: Installing Homebrew..."
    echo "This will take 5-10 minutes. Please wait..."
    echo ""
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add Homebrew to PATH (for Apple Silicon Macs)
    if [ -f "/opt/homebrew/bin/brew" ]; then
        eval "$(/opt/homebrew/bin/brew shellenv)"
    elif [ -f "/usr/local/bin/brew" ]; then
        eval "$(/usr/local/bin/brew shellenv)"
    fi
fi

echo ""
echo "✅ Homebrew installed!"
echo ""

# Step 2: Install GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "📦 Step 2: Installing GitHub CLI..."
    brew install gh
    echo "✅ GitHub CLI installed!"
else
    echo "✅ GitHub CLI already installed!"
fi

echo ""

# Step 3: Login to GitHub
echo "🔐 Step 3: GitHub Authentication"
echo "---------------------------------"
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub..."
    echo "A browser window will open. Please:"
    echo "1. Click 'Authorize' in the browser"
    echo "2. Follow the prompts"
    echo ""
    gh auth login --web
else
    echo "✅ Already logged in to GitHub"
    gh auth status
fi

echo ""
echo "📦 Step 4: Creating Repository and Pushing Code"
echo "------------------------------------------------"
echo ""

# Check if repository already exists
if gh repo view rammc007-tech/rfb-inventory &> /dev/null; then
    echo "⚠️  Repository 'rfb-inventory' already exists!"
    echo ""
    read -p "Do you want to push code to existing repository? (y/n): " push_existing
    if [ "$push_existing" = "y" ]; then
        echo ""
        echo "📤 Pushing code to existing repository..."
        git remote remove origin 2>/dev/null || true
        git remote add origin https://github.com/rammc007-tech/rfb-inventory.git
        git branch -M main
        git push -u origin main --force
        echo ""
        echo "✅ Code pushed successfully!"
    else
        echo "Skipping..."
        exit 0
    fi
else
    echo "Creating new repository 'rfb-inventory'..."
    gh repo create rfb-inventory --public --source=. --remote=origin --push --description "RFB Inventory & Production System"
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ SUCCESS! Repository created and code pushed!"
    else
        echo ""
        echo "❌ Error creating repository."
        exit 1
    fi
fi

echo ""
echo "🎉 Deployment Complete!"
echo "======================="
echo ""
REPO_URL="https://github.com/rammc007-tech/rfb-inventory"
echo "🔗 Repository: $REPO_URL"
echo ""

# Open repository in browser
if command -v open &> /dev/null; then
    echo "🌐 Opening repository in browser..."
    open "$REPO_URL"
fi

echo ""
echo "📋 Next Steps for Vercel Deployment:"
echo "------------------------------------"
echo "1. Open: https://vercel.com/new"
echo "2. Click 'Continue with GitHub'"
echo "3. Select 'rfb-inventory' repository"
echo "4. Click 'Import'"
echo "5. Add environment variables:"
echo "   - DATABASE_URL (create Vercel Postgres database)"
echo "   - NEXTAUTH_URL: https://rfb-inventory-1.vercel.app"
echo "   - NEXTAUTH_SECRET: (run: openssl rand -base64 32)"
echo "6. Click 'Deploy'"
echo ""
echo "✅ GitHub deployment done! Now proceed to Vercel."

