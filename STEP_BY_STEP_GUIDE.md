# 🚂 Railway Deployment - Step by Step Guide

## ✅ Current Status

1. **PostgreSQL Database**: ✅ Created
2. **App Service**: ✅ Created (RFB-inventory-)
3. **DATABASE_URL**: ⚠️ Needs to be added
4. **NEXTAUTH_URL**: ⚠️ Needs to be added
5. **NEXTAUTH_SECRET**: ✅ Generated (`wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=`)

## 📋 Next Steps (Click by Click)

### Step 1: Add DATABASE_URL Variable Reference

1. **Go to**: https://railway.com/project/7508206c-97f3-4a7f-8281-756bbbc8faf1/service/69a5f4c0-046d-4de0-8de1-1163b8646b42/variables

2. **Click**: "Add Variable" button (in the blue banner that says "Trying to connect a database?")

3. **Select**: PostgreSQL service from the dropdown

4. **Select**: `DATABASE_URL` variable

5. **Click**: "Add" or "Save"

This will automatically link the DATABASE_URL from PostgreSQL to your app service.

### Step 2: Add NEXTAUTH_SECRET

1. **On the same Variables page**, click **"New Variable"** button

2. **Variable Name**: `NEXTAUTH_SECRET`

3. **Variable Value**: `wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=`

4. **Click**: "Add" or "Save"

### Step 3: Generate Domain and Add NEXTAUTH_URL

1. **Go to**: Settings tab (in the app service)

2. **Scroll down** to "Networking" section

3. **Click**: "Generate Domain" button

4. **Copy** the generated URL (e.g., `https://rfb-inventory-production.up.railway.app`)

5. **Go back** to Variables tab

6. **Click**: "New Variable"

7. **Variable Name**: `NEXTAUTH_URL`

8. **Variable Value**: Paste the generated URL

9. **Click**: "Add" or "Save"

### Step 4: Redeploy

After adding all variables, Railway will automatically redeploy. Or:

1. **Go to**: Deployments tab

2. **Click**: "Redeploy" button

## 🎯 Expected Result

After successful deployment:
- App will be live at the generated Railway URL
- Admin login: `admin@rfb.com` / `admin123`
- All features working

---

**Note**: If "Add Variable" button doesn't work, you can manually add DATABASE_URL by:
1. Click "New Variable"
2. Variable Name: `DATABASE_URL`
3. Go to PostgreSQL service → Variables tab
4. Copy the `DATABASE_URL` value
5. Paste it in the app service variable value

