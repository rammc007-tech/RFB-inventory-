# ⚠️ URGENT: Prevent Usage Waste

## 🔴 Current Problem
- Deployments are failing (DATABASE_URL missing)
- Each failed deployment wastes build minutes
- Your token balance is limited

## ✅ IMMEDIATE ACTION REQUIRED

### Step 1: Disable Automatic Deployments (2 minutes)

1. Open: https://vercel.com/rammc007-techs-projects/rfb-inventory/settings/git
2. Scroll down to "Seamlessly create Deployment for any commit pushed"
3. Find the "Enabled" checkbox
4. **UNCHECK it** to disable automatic deployments
5. This stops new deployments until you're ready

### Step 2: Create Database (5 minutes)

1. Open: https://vercel.com/storage
2. Click "Create Database"
3. Select "Postgres"
4. Choose "Hobby" plan (Free tier)
5. Name: `rfb-inventory-db`
6. Click "Create"
7. **Copy the DATABASE_URL** (starts with `postgresql://`)

### Step 3: Set Environment Variables (3 minutes)

1. Open: https://vercel.com/rammc007-techs-projects/rfb-inventory/settings/environment-variables
2. Click "Create new"
3. Add these 3 variables:

   **Variable 1:**
   - Key: `DATABASE_URL`
   - Value: (paste from Step 2)
   - Environment: All Environments
   - Save

   **Variable 2:**
   - Click "Add Another"
   - Key: `NEXTAUTH_URL`
   - Value: `https://rfb-inventory.vercel.app`
   - Environment: All Environments
   - Save

   **Variable 3:**
   - Click "Add Another"
   - Key: `NEXTAUTH_SECRET`
   - Value: `ZKz9DMHsz0DIcraxrtpyX7hrLHHoVjAFAZiZxbDAHTA=`
   - Environment: All Environments
   - Save

### Step 4: Re-enable Automatic Deployments

1. Go back to: https://vercel.com/rammc007-techs-projects/rfb-inventory/settings/git
2. **CHECK the "Enabled" checkbox** again
3. Now deployments will succeed!

## 🎯 Total Time: ~10 minutes
## 💰 Result: No more wasted build minutes!

---

## 📝 Quick Checklist

- [ ] Disable automatic deployments
- [ ] Create Postgres database
- [ ] Copy DATABASE_URL
- [ ] Add DATABASE_URL environment variable
- [ ] Add NEXTAUTH_URL environment variable
- [ ] Add NEXTAUTH_SECRET environment variable
- [ ] Re-enable automatic deployments

Once all checked, deployment will succeed on next push!
