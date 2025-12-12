# 🚂 Railway Deployment - Step by Step Guide

## ✅ Code Ready
- ✅ Code pushed to GitHub: `rammc007-tech/RFB-inventory-`
- ✅ PostgreSQL schema configured
- ✅ Railway configuration files ready
- ✅ Build scripts ready

## 🚀 Deployment Steps

### 1. Login to Railway
- Railway website should be open in your browser
- Click "Login" or "Start a New Project"
- Login with GitHub account

### 2. Create New Project
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose repository: `rammc007-tech/RFB-inventory-`

### 3. Add PostgreSQL Database
- In your Railway project dashboard
- Click "New" → "Database" → "Add PostgreSQL"
- Railway will automatically create the database
- **Copy the DATABASE_URL** (you'll need it)

### 4. Set Environment Variables
In Railway project → Settings → Variables, add:

```
DATABASE_URL=<from PostgreSQL service - Railway sets this automatically>
NEXTAUTH_URL=https://your-app-name.railway.app
NEXTAUTH_SECRET=<generate using: openssl rand -base64 32>
```

To generate NEXTAUTH_SECRET, run in terminal:
```bash
openssl rand -base64 32
```

### 5. Deploy
Railway will automatically:
- ✅ Detect Next.js framework
- ✅ Use `railway.json` configuration
- ✅ Run build script
- ✅ Run migrations and seed
- ✅ Deploy your app

### 6. Get Your App URL
- After deployment, Railway will show your app URL
- Format: `https://your-app-name.railway.app`
- Click on the URL to open your deployed app

## 📝 Default Login Credentials
- **Email:** admin@rfb.com
- **Password:** admin123

## ✅ What Happens Automatically
1. Railway detects `railway.json` configuration
2. Runs `scripts/railway-build.sh` to build
3. Runs `scripts/railway-start.sh` which:
   - Runs database migrations
   - Seeds the database (creates admin user)
   - Starts Next.js server

## 🔧 If Deployment Fails
1. Check Railway logs in the dashboard
2. Verify environment variables are set
3. Check that DATABASE_URL is correct
4. Ensure NEXTAUTH_SECRET is at least 32 characters

## 🎉 After Successful Deployment
Your app will be live at: `https://your-app-name.railway.app`

