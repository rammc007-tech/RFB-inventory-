#!/bin/bash

# RFB Inventory - Deployment Script
# This script helps you deploy to GitHub and Vercel

echo "🚀 RFB Inventory Deployment Helper"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Check git status
if [ ! -d ".git" ]; then
    echo "❌ Error: Git not initialized"
    exit 1
fi

echo "✅ Git repository found"
echo ""

# Check if remote is already set
if git remote get-url origin > /dev/null 2>&1; then
    CURRENT_REMOTE=$(git remote get-url origin)
    echo "📍 Current remote: $CURRENT_REMOTE"
    echo ""
    read -p "Do you want to use this remote? (y/n): " use_existing
    if [ "$use_existing" != "y" ]; then
        git remote remove origin
    else
        echo ""
        echo "📤 Pushing code to GitHub..."
        git branch -M main
        git push -u origin main
        echo ""
        echo "✅ Code pushed successfully!"
        echo "🔗 Repository: $CURRENT_REMOTE"
        exit 0
    fi
fi

echo "📝 Step 1: GitHub Repository Setup"
echo "-----------------------------------"
echo ""
echo "You need to create a GitHub repository first."
echo ""
echo "Option 1: Using GitHub CLI (if installed)"
echo "Option 2: Manual creation (I'll guide you)"
echo ""

# Check for GitHub CLI
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI found!"
    echo ""
    read -p "Do you want to use GitHub CLI to create repository? (y/n): " use_gh
    if [ "$use_gh" = "y" ]; then
        echo ""
        echo "🔐 Please login to GitHub (if not already logged in)..."
        gh auth login
        
        echo ""
        echo "📦 Creating repository 'rfb-inventory'..."
        gh repo create rfb-inventory --public --source=. --remote=origin --push
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "✅ Repository created and code pushed!"
            REPO_URL=$(gh repo view --web 2>/dev/null || echo "https://github.com/rammc007-tech/rfb-inventory")
            echo "🔗 Repository: $REPO_URL"
            exit 0
        else
            echo ""
            echo "❌ Failed to create repository using GitHub CLI"
            echo "Let's try manual method..."
        fi
    fi
fi

echo ""
echo "📋 Manual Setup Instructions:"
echo "----------------------------"
echo ""
echo "1. Open this link in your browser:"
echo "   👉 https://github.com/new"
echo ""
echo "2. Fill in:"
echo "   - Repository name: rfb-inventory"
echo "   - Description: RFB Inventory & Production System"
echo "   - Make it Public or Private (your choice)"
echo "   - ⚠️  IMPORTANT: DO NOT check 'Add a README file'"
echo "   - ⚠️  IMPORTANT: DO NOT add .gitignore or license"
echo ""
echo "3. Click 'Create repository'"
echo ""
echo "4. After creating, come back here and press ENTER"
read -p "Press ENTER after you've created the repository..."

echo ""
echo "📤 Step 2: Connecting and Pushing Code"
echo "---------------------------------------"
echo ""

# Set remote
REPO_URL="https://github.com/rammc007-tech/rfb-inventory.git"
echo "Setting remote to: $REPO_URL"
git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"

echo ""
echo "Pushing code to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! Code pushed to GitHub!"
    echo ""
    echo "🔗 Your repository: https://github.com/rammc007-tech/rfb-inventory"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to: https://vercel.com/new"
    echo "2. Import your repository: rfb-inventory"
    echo "3. Add environment variables (see DEPLOYMENT_GUIDE.md)"
    echo "4. Deploy!"
else
    echo ""
    echo "❌ Error pushing code. Please check:"
    echo "   - Is the repository created on GitHub?"
    echo "   - Do you have access to push?"
    echo "   - Try: git push -u origin main"
fi

