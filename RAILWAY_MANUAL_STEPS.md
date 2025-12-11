# 🚂 Railway Deployment - Manual Steps Guide

## ✅ Completed Steps

1. **Service Created**
   - ✅ Service: `RFB-inventory-`
   - ✅ Repository: `rammc007-tech/RFB-inventory-`
   - ✅ Connected to GitHub

2. **Generated Secrets**
   - ✅ NEXTAUTH_SECRET: `wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=`

## 📋 Manual Steps to Complete

### Step 1: Add PostgreSQL Database

1. Go to Railway project: https://railway.com/project/7508206c-97f3-4a7f-8281-756bbbc8faf1
2. Click **"Create"** button (top right of canvas)
3. In the search dialog, type: **"postgresql"** or **"postgres"**
4. Select **"PostgreSQL"** from the database options
5. Railway will automatically create the database
6. **Important:** After database is created:
   - Click on the PostgreSQL service
   - Go to **Variables** tab
   - Copy the `DATABASE_URL` value

### Step 2: Add Environment Variables

1. Go to your app service: `RFB-inventory-`
2. Click **Variables** tab
3. Click **"New Variable"** button
4. Add these variables one by one:

**Variable 1:**
- Name: `NEXTAUTH_SECRET`
- Value: `wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=`
- Click **Add**

**Variable 2:**
- Name: `NEXTAUTH_URL`
- Value: `https://your-app-name.railway.app` (get this from service → Settings → Networking → Generate Domain)
- Click **Add**

**Variable 3:**
- Name: `DATABASE_URL`
- Value: `<copy from PostgreSQL service variables>`
- Click **Add**

### Step 3: Get App URL

1. In your app service (`RFB-inventory-`)
2. Go to **Settings** tab
3. Scroll to **Networking** section
4. Click **"Generate Domain"** button
5. Copy the generated URL (e.g., `https://rfb-inventory-production.up.railway.app`)
6. Use this URL for `NEXTAUTH_URL` variable

### Step 4: Deploy

Railway will automatically:
- ✅ Detect Next.js
- ✅ Run build command from `railway.json`
- ✅ Switch to PostgreSQL
- ✅ Run Prisma migrations
- ✅ Seed database with admin user
- ✅ Deploy app

## 🎯 Expected Result

After deployment:
- App URL: `https://your-app-name.railway.app`
- Admin login: `admin@rfb.com` / `admin123`
- All features working

## 📄 Files Ready

- ✅ `railway.json` - Build configuration
- ✅ `scripts/switch-to-postgres.js` - Auto-switch script
- ✅ All source files committed to GitHub

## 💡 Quick Reference

**Project URL:**
https://railway.com/project/7508206c-97f3-4a7f-8281-756bbbc8faf1

**Service URL:**
https://railway.com/project/7508206c-97f3-4a7f-8281-756bbbc8faf1/service/69a5f4c0-046d-4de0-8de1-1163b8646b42

**NEXTAUTH_SECRET:**
```
wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=
```

---

**Status**: Service created, ready for database and environment variables setup.

