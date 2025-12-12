# 🛡️ Protect Files from Cursor AI Edits - Complete Guide

## ⚠️ Problem

Cursor AI sometimes auto-edits or auto-fixes files during:
- Deploy operations
- AI chat suggestions
- Auto-fix features
- Code refactoring

**This can break your deployment configuration!**

## ✅ Solution: Complete Protection Setup

### Method 1: Cursor Settings (Easiest)

#### Step 1: Disable Auto Apply Fixes

1. Open Cursor
2. Go to: **Settings** → **AI**
3. Disable these options:
   - ❌ "Auto Apply Fixes"
   - ❌ "Auto Edit Code"
   - ❌ "Auto Refactor"
   - ❌ "Auto Complete on Save"

#### Step 2: Disable Auto Deploy Triggers

1. Go to: **Settings** → **Deploy**
2. Disable:
   - ❌ "Auto Redeploy on Commit"
   - ❌ "Auto Retry Deploy"
   - ❌ "Auto Deploy on Push"

#### Step 3: Set AI Actions to Manual

1. Go to: **Settings** → **AI** → **Actions**
2. Set to: **"Ask before making changes"**
3. Enable: **"Require confirmation for file edits"**

### Method 2: Protect Specific Files (Best Option)

**Right-click on file → "Protect from AI edits"**

#### Files to Protect:

**Critical Deployment Files:**
- ✅ `Dockerfile`
- ✅ `cursor.json`
- ✅ `.dockerignore`
- ✅ `railway.json`
- ✅ `nixpacks.toml`

**Configuration Files:**
- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `tailwind.config.ts`
- ✅ `postcss.config.js`

**Database Files:**
- ✅ `prisma/schema.prisma`
- ✅ `prisma/seed.ts`

**Environment Files:**
- ✅ `.env*` (all env files)
- ✅ `.env.local`
- ✅ `.env.production`

**Scripts:**
- ✅ `scripts/*.sh`
- ✅ `scripts/*.js`

### Method 3: Create Protection List

Create a file `.cursor-protect` (if supported) or add to Cursor settings:

```
Dockerfile
cursor.json
.dockerignore
railway.json
nixpacks.toml
package.json
next.config.js
prisma/schema.prisma
.env*
scripts/
```

## 🔒 Quick Protection Checklist

### ✅ Do This Now:

1. **Protect Dockerfile:**
   - Right-click `Dockerfile` → "Protect from AI edits"

2. **Protect cursor.json:**
   - Right-click `cursor.json` → "Protect from AI edits"

3. **Protect package.json:**
   - Right-click `package.json` → "Protect from AI edits"

4. **Protect prisma/schema.prisma:**
   - Right-click `prisma/schema.prisma` → "Protect from AI edits"

5. **Disable Auto Features:**
   - Settings → AI → Disable all auto-apply options

6. **Set Manual Mode:**
   - Settings → AI → "Ask before making changes"

## 🎯 Safe Workflow (Follow Always)

### ✅ Correct Workflow:

1. **You write code** → Manual coding
2. **AI suggests** → You review and manually accept/decline
3. **AI chat help** → You copy code manually (don't auto-apply)
4. **Commit** → You commit manually
5. **Deploy** → You deploy manually

### ❌ Avoid This:

- ❌ Auto-apply AI suggestions
- ❌ Auto-fix on save
- ❌ Auto-deploy on commit
- ❌ Let AI edit protected files

## 📋 Verification

### Check Protection Status:

1. Right-click on protected file
2. Should show: "Protected from AI edits" ✅
3. AI should ask permission before editing

### Test Protection:

1. Ask AI to modify `Dockerfile`
2. AI should ask: "This file is protected. Continue?"
3. You can approve or deny

## 🚨 If AI Still Edits Files

### Emergency Steps:

1. **Immediately:**
   - `git status` - Check what changed
   - `git diff` - See changes
   - `git restore <file>` - Revert if needed

2. **Fix Settings:**
   - Re-check all protection settings
   - Re-protect files
   - Disable all auto-features

3. **Prevent Future:**
   - Add files to `.gitignore` if needed
   - Use Git hooks to prevent unwanted commits
   - Review all AI suggestions before accepting

## 💡 Additional Tips

### 1. Use Git Branches

- Work on `dev` branch
- AI can edit freely on dev
- Merge to `main` only after review
- Protect `main` branch

### 2. Code Reviews

- Always review AI changes
- Test before committing
- Use staging environment

### 3. Backup Important Files

- Keep backup of:
  - `Dockerfile`
  - `package.json`
  - `prisma/schema.prisma`
  - Configuration files

## ✅ Final Checklist

- [ ] Disabled all auto-apply features
- [ ] Set AI to "Ask before making changes"
- [ ] Protected `Dockerfile`
- [ ] Protected `cursor.json`
- [ ] Protected `package.json`
- [ ] Protected `prisma/schema.prisma`
- [ ] Protected all `.env*` files
- [ ] Disabled auto-deploy
- [ ] Verified protection works

## 🎯 Result

After following this guide:
- ✅ Cursor will NEVER auto-edit protected files
- ✅ AI will always ask permission
- ✅ Your deployment configs are safe
- ✅ No unwanted code changes
- ✅ Full control over your codebase

---

**Your files are now protected! 🛡️**

