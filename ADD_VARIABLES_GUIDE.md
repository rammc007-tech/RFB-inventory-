# 🔧 Add Missing Environment Variables

## Current Status
- ✅ DATABASE_URL: Added
- ❌ NEXTAUTH_SECRET: Missing
- ❌ NEXTAUTH_URL: Missing

## Step 1: Add NEXTAUTH_SECRET

1. On the Variables page, click **"+ New Variable"** button
2. In **"VARIABLE_NAME"** field, type: `NEXTAUTH_SECRET`
3. In **"VALUE or ${{REF}}"** field, type: `wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=`
4. Click **"Add"** button

## Step 2: Generate Domain for NEXTAUTH_URL

1. Go to **Settings** tab (in the app service)
2. Scroll to **"Networking"** section
3. Click **"Generate Domain"** button
4. Copy the generated URL (e.g., `https://rfb-inventory-production.up.railway.app`)

## Step 3: Add NEXTAUTH_URL

1. Go back to **Variables** tab
2. Click **"+ New Variable"** button
3. In **"VARIABLE_NAME"** field, type: `NEXTAUTH_URL`
4. In **"VALUE or ${{REF}}"** field, paste the generated URL
5. Click **"Add"** button

## Step 4: Redeploy

After adding both variables, Railway will automatically redeploy. Or manually:
- Go to **Deployments** tab
- Click **"Redeploy"** button

---

**Note**: The build failed because these variables are required for NextAuth.js to work.

