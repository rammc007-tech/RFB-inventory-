# 🚂 Railway Deployment Guide - Permanent Fix

This guide provides a **100% reliable** Railway deployment setup that will prevent build failures.

## ✅ What's Fixed

1. **Robust Build Script** (`scripts/railway-build.sh`)
   - Retry logic for all critical steps
   - Database connection verification
   - Proper error handling
   - Timeout management

2. **Health Check Endpoint** (`/api/health`)
   - Railway can verify app is running
   - Database connection status

3. **Error-Resilient Seed Script**
   - Won't fail build if data already exists
   - Graceful error handling

## 📋 Pre-Deployment Checklist

### Step 1: Verify Railway Project Setup

1. **Create PostgreSQL Database**:
   - Railway Dashboard → New → Database → PostgreSQL
   - Wait for database to be provisioned

2. **Get External Database URL**:
   - Database Service → Variables → `DATABASE_URL`
   - **CRITICAL**: Must be external URL with `.app` domain
   - ✅ Correct: `postgresql://postgres:password@xxxxx.up.railway.app:5432/railway`
   - ❌ Wrong: `postgresql://postgres:password@postgres.railway.internal:5432/railway`

3. **Enable "Available During Build"**:
   - Database Service → Variables → `DATABASE_URL`
   - Toggle: **"Available during build"** → **ON** ✅
   - This is **CRITICAL** for build success

### Step 2: Configure App Service Variables

Go to your **App Service** → Variables and add:

```env
DATABASE_URL=postgresql://postgres:password@xxxxx.up.railway.app:5432/railway
NEXTAUTH_URL=https://your-app-name.up.railway.app
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars
```

**Important**:
- `DATABASE_URL` must be the **external URL** from Step 1
- `NEXTAUTH_URL` should be your Railway app URL
- `NEXTAUTH_SECRET` - generate a random 32+ character string

### Step 3: Connect GitHub Repository

1. Railway Dashboard → New Project → Deploy from GitHub
2. Select your repository: `rammc007-tech/RFB-inventory-`
3. Railway will automatically detect the project

### Step 4: Verify Build Configuration

Railway should automatically use `railway.json`:
- Build Command: `bash scripts/railway-build.sh`
- Start Command: `next start`

## 🔧 Build Process

The build script (`scripts/railway-build.sh`) performs these steps:

1. ✅ Validates `DATABASE_URL` format
2. ✅ Installs dependencies with retry
3. ✅ Generates Prisma Client
4. ✅ Waits for database connection (30s timeout)
5. ✅ Pushes database schema with retry
6. ✅ Seeds database (non-blocking)
7. ✅ Builds Next.js application with retry

## 🚨 Troubleshooting

### Build Fails: "DATABASE_URL not found"

**Solution**:
1. Check if `DATABASE_URL` is set in App Service variables
2. Verify "Available during build" is **ON**
3. Ensure it's the external URL (`.app` domain)

### Build Fails: "Database connection timeout"

**Solution**:
1. Verify database is running (Railway Dashboard)
2. Check `DATABASE_URL` is correct external URL
3. Wait 1-2 minutes and retry deployment

### Build Fails: "Prisma schema validation error"

**Solution**:
1. Ensure `prisma/schema.prisma` has `provider = "postgresql"`
2. Run `npx prisma generate` locally to verify schema
3. Check for syntax errors in schema file

### Build Fails: "Command not found: bash"

**Solution**:
- Railway uses Nixpacks which includes bash
- If issue persists, change `railway.json`:
  ```json
  "buildCommand": "sh scripts/railway-build.sh"
  ```

### App Starts But Shows Errors

**Check**:
1. Health endpoint: `https://your-app.up.railway.app/api/health`
2. Should return: `{"status":"healthy","database":"connected"}`
3. If unhealthy, check database connection

## 📊 Monitoring

### Health Check

Visit: `https://your-app.up.railway.app/api/health`

**Expected Response**:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": "connected"
}
```

### Build Logs

Railway Dashboard → Deployments → Click on deployment → View logs

Look for:
- ✅ `[SUCCESS]` messages
- ❌ `[ERROR]` messages
- ⚠️ `[WARN]` messages (usually OK)

## 🎯 Success Indicators

Your deployment is successful when:

1. ✅ Build completes without errors
2. ✅ Health check returns `healthy`
3. ✅ App URL loads without errors
4. ✅ Login page appears at `/login`
5. ✅ Can login with `admin@rfb.com` / `admin123`

## 🔄 Re-deployment

If you need to redeploy:

1. **Clear Cache** (if build keeps failing):
   - Railway Dashboard → Deployments
   - Click "Clear Cache and Redeploy"

2. **Manual Trigger**:
   - Push a new commit to GitHub
   - Railway will auto-deploy

3. **Force Rebuild**:
   - Railway Dashboard → Settings → Deployments
   - Click "Redeploy"

## 📝 Important Notes

1. **Never use internal URLs** (`railway.internal`) - they don't work during build
2. **Always enable "Available during build"** for `DATABASE_URL`
3. **Seed script errors are OK** - data might already exist
4. **Build script has retry logic** - temporary failures will retry automatically

## ✅ Final Checklist

Before considering deployment complete:

- [ ] Database created and running
- [ ] `DATABASE_URL` is external URL (`.app` domain)
- [ ] "Available during build" is **ON**
- [ ] All environment variables set
- [ ] Build completes successfully
- [ ] Health check returns `healthy`
- [ ] App loads without errors
- [ ] Login works

## 🎉 You're Done!

Your Railway deployment is now configured with a robust build system that handles errors gracefully and retries automatically.

---

**Need Help?** Check Railway build logs for specific error messages and refer to the troubleshooting section above.

