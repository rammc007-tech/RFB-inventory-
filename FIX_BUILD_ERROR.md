# 🔧 Fix Build Error - NEXTAUTH_URL Missing

## Problem
Build is failing because `NEXTAUTH_URL` environment variable is missing. NextAuth.js requires this during build time.

## Solution

### Step 1: Add Temporary NEXTAUTH_URL (to allow build to succeed)

1. Go to Variables page
2. Click **"+ New Variable"** button
3. **Variable Name**: `NEXTAUTH_URL`
4. **Variable Value**: `https://placeholder.railway.app` (temporary)
5. Click **"Add"** button
6. Click **"Deploy"** button

### Step 2: Generate Real Domain

1. Go to **Settings** tab
2. Scroll to **"Networking"** section
3. Under **"Public Networking"**, look for domain options
4. Click **"Generate Domain"** or enable public networking
5. Copy the generated URL (e.g., `https://rfb-inventory-production.up.railway.app`)

### Step 3: Update NEXTAUTH_URL with Real Domain

1. Go back to **Variables** tab
2. Find `NEXTAUTH_URL` variable
3. Click on it to edit
4. Replace `https://placeholder.railway.app` with the real domain
5. Click **"Save"**
6. Railway will automatically redeploy

---

**Note**: The temporary placeholder allows the build to succeed. Once we have the real domain, we update it and redeploy.

