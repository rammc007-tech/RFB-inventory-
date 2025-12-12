# 🚀 Railway Deployment - இப்போது செய்ய வேண்டியவை

## 📋 Step-by-Step Instructions

### Step 1: GitHub Login (Browser-ல்)
Browser-ல் GitHub login page திறந்திருக்கும்:
1. **Username or email** enter செய்யவும்
2. **Password** enter செய்யவும்
3. **"Sign in"** button click செய்யவும்
4. 2FA இருந்தால், code enter செய்யவும்

### Step 2: Railway-க்கு Authorize செய்யவும்
GitHub login முடிந்த பிறகு:
1. Railway-க்கு repository access authorize செய்யவும்
2. **"Authorize Railway"** button click செய்யவும்

### Step 3: Repository Select செய்யவும்
Railway-ல் repository list வரும்:
1. **`rammc007-tech/RFB-inventory-`** repository select செய்யவும்
2. Railway automatically build start செய்யும்

### Step 4: PostgreSQL Database Add செய்யவும்
Railway project dashboard-ல்:
1. **"New"** button click செய்யவும்
2. **"Database"** select செய்யவும்
3. **"Add PostgreSQL"** click செய்யவும்
4. Railway automatically database create செய்யும்

### Step 5: Environment Variables Set செய்யவும்
Railway project-ல்:
1. **Settings** → **Variables** click செய்யவும்
2. Add these variables:
   ```
   NEXTAUTH_URL = https://your-app-name.railway.app
   NEXTAUTH_SECRET = fmUlOk9xlT4aq9ZeUkTKLpQ9AWthYpY31osg/F30hgI=
   ```
   (DATABASE_URL Railway automatically set செய்யும்)

### Step 6: Deployment Complete
Railway automatically:
- ✅ Build செய்யும்
- ✅ Database migrations run செய்யும்
- ✅ Admin user create செய்யும்
- ✅ App deploy செய்யும்

### Step 7: App URL கிடைக்கும்
Deployment முடிந்த பிறகு:
- Railway dashboard-ல் app URL காட்டும்
- Format: `https://your-app-name.railway.app`
- அந்த URL-ஐ click செய்து app-ஐ open செய்யவும்

## 🔑 Default Login Credentials
- **Email:** admin@rfb.com
- **Password:** admin123

## ⚠️ Important Notes
- Railway build 2-5 minutes எடுக்கும்
- Build complete ஆகும் வரை wait செய்யவும்
- Error வந்தால் Railway logs check செய்யவும்

## 🎉 Success!
Deployment complete ஆன பிறகு, உங்கள் app live-ஆக இருக்கும்!

