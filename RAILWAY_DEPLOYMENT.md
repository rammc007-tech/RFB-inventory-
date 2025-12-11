# 🚂 Railway Deployment Guide

## Why Railway?

✅ **Better for databases** - Easy PostgreSQL setup
✅ **Simpler configuration** - Less manual steps
✅ **Automatic migrations** - Prisma migrations run automatically
✅ **Good Next.js support** - Native Next.js deployment
✅ **Free tier available** - $5 credit monthly

## Prerequisites

1. GitHub account (code should be on GitHub)
2. Railway account (sign up at https://railway.app)

## Step-by-Step Deployment

### 1. Prepare Code for Railway

The code is already ready! Just need to ensure:
- ✅ Prisma schema uses PostgreSQL (already configured)
- ✅ Environment variables are set
- ✅ Build command is correct

### 2. Push Code to GitHub

```bash
cd "/Users/ramelumalai/RFB Inventory 1"
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 3. Create Railway Project

1. Go to https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository: `rammc007-tech/RFB-inventory-`
5. Railway will automatically detect Next.js

### 4. Add PostgreSQL Database

1. In Railway project, click "New" → "Database" → "Add PostgreSQL"
2. Railway will create a PostgreSQL database automatically
3. Copy the `DATABASE_URL` from the database service

### 5. Set Environment Variables

In Railway project → Settings → Variables, add:

```
DATABASE_URL=<from PostgreSQL service>
NEXTAUTH_URL=https://your-app-name.railway.app
NEXTAUTH_SECRET=<generate a random secret>
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 6. Configure Build Settings

Railway auto-detects Next.js, but verify:

**Build Command:**
```
prisma generate && prisma migrate deploy && npm run prisma:seed && next build
```

**Start Command:**
```
next start
```

### 7. Deploy

Railway will automatically:
- ✅ Install dependencies
- ✅ Run Prisma generate
- ✅ Run migrations
- ✅ Seed database
- ✅ Build Next.js app
- ✅ Deploy to production

## Advantages Over Vercel

| Feature | Railway | Vercel |
|---------|---------|--------|
| Database Setup | ✅ One-click PostgreSQL | ⚠️ Manual setup required |
| Migrations | ✅ Automatic | ⚠️ Manual configuration |
| Environment Variables | ✅ Easy UI | ✅ Easy UI |
| Free Tier | ✅ $5/month credit | ✅ Hobby plan |
| Deployment Speed | ✅ Fast | ✅ Fast |
| Daily Limits | ✅ No strict limits | ⚠️ 100 deployments/day |

## Railway Configuration File (Optional)

Create `railway.json` for custom settings:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "prisma generate && prisma migrate deploy && npm run prisma:seed && next build"
  },
  "deploy": {
    "startCommand": "next start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Post-Deployment

1. **Verify Database:**
   - Check if admin user exists
   - Login with: admin@rfb.com / admin123

2. **Custom Domain (Optional):**
   - Railway → Settings → Domains
   - Add your custom domain

3. **Monitor:**
   - Railway dashboard shows logs
   - Check deployment status

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check database service is running
- Ensure migrations ran successfully

### Build Failures
- Check build logs in Railway
- Verify all dependencies in `package.json`
- Ensure Prisma client is generated

### Login Not Working
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches Railway domain
- Ensure seed script ran (admin user created)

## Cost Estimate

**Free Tier:**
- $5 credit per month
- Enough for small to medium apps
- Pay-as-you-go after credit

**Typical Monthly Cost:**
- Next.js app: ~$5-10/month
- PostgreSQL: ~$5/month
- Total: ~$10-15/month (after free credit)

## Next Steps

1. ✅ Code is ready
2. ⏳ Push to GitHub
3. ⏳ Create Railway account
4. ⏳ Deploy from GitHub
5. ⏳ Add PostgreSQL database
6. ⏳ Set environment variables
7. ⏳ Deploy!

## Support

Railway has excellent documentation:
- https://docs.railway.app
- Discord community support
- Email support available

---

**Ready to deploy?** Railway is a great choice for this app! 🚀

