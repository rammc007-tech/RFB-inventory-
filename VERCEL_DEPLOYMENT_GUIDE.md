# 🚀 Vercel Deployment Guide

## ✅ Configuration Updated

**vercel.json** has been updated to enable Vercel deployment:
```json
{
  "buildCommand": "npx prisma generate && npm run build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

## 📋 Deployment Steps

### Option 1: Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select repository: `rammc007-tech/RFB-inventory-`
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npx prisma generate && npm run build` (auto-set)
   - **Output Directory**: `.next` (auto-set)
   - **Install Command**: `npm install` (auto-set)

4. **Environment Variables** (CRITICAL)
   Add these in Vercel dashboard:
   ```
   DATABASE_URL=postgresql://user:password@host:port/database
   NEXTAUTH_URL=https://your-project.vercel.app
   NEXTAUTH_SECRET=your-secret-key-here
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Vercel CLI

1. **Install Vercel CLI** (if needed):
   ```bash
   npm install -g vercel
   # Or use npx (no install needed):
   npx vercel
   ```

2. **Login to Vercel**:
   ```bash
   npx vercel login
   ```

3. **Deploy**:
   ```bash
   npx vercel --prod
   ```

4. **Set Environment Variables**:
   ```bash
   npx vercel env add DATABASE_URL
   npx vercel env add NEXTAUTH_URL
   npx vercel env add NEXTAUTH_SECRET
   ```

## 🔑 Required Environment Variables

### For Vercel Dashboard:
1. Go to: **Project Settings** → **Environment Variables**
2. Add:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_URL` - Your Vercel app URL (e.g., `https://rfb-inventory.vercel.app`)
   - `NEXTAUTH_SECRET` - Random secret string (generate with: `openssl rand -base64 32`)

### Database Setup:
- **Option A**: Use Vercel Postgres (Recommended)
  - Go to: Vercel Dashboard → Storage → Create Database → Postgres
  - Vercel will auto-set `DATABASE_URL`
  
- **Option B**: External PostgreSQL
  - Use Railway, Supabase, or other PostgreSQL provider
  - Add connection string to `DATABASE_URL`

## 📝 Build Configuration

**Build Command**: `npx prisma generate && npm run build`
- Generates Prisma Client
- Builds Next.js application

**Install Command**: `npm install`
- Installs all dependencies

## ⚠️ Important Notes

1. **PostgreSQL Required**: Project uses PostgreSQL (not SQLite) for production
2. **Prisma Migrations**: Will run automatically on first deploy
3. **Database Seeding**: May need to run manually after first deploy
4. **Build Time**: ~3-5 minutes for first deployment

## 🔄 After Deployment

1. **Check Build Logs**: Verify build succeeded
2. **Run Migrations**: If needed, run `npx prisma migrate deploy`
3. **Seed Database**: If needed, run `npm run prisma:seed`
4. **Test Application**: Visit your Vercel URL

## 🎯 Next Steps

1. ✅ vercel.json updated
2. ⏳ Connect project in Vercel dashboard
3. ⏳ Add environment variables
4. ⏳ Deploy

---

**Ready for Vercel deployment! 🚀**

