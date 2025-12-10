# 😊 மிக எளிய Steps - 3 Steps மட்டும்!

நீங்கள் stress எடுக்க வேண்டாம். இது மிக எளிது!

## Step 1: Database (2 நிமிடம்)

1. Browser-ல்: https://vercel.com/storage
2. "Create Database" click
3. "Postgres" → "Hobby" → Name: `rfb-inventory-db`
4. Create → DATABASE_URL copy

## Step 2: Environment Variables (2 நிமிடம்)

1. Browser-ல்: https://vercel.com/rammc007-techs-projects/rfb-inventory/settings/environment-variables
2. "Create new" click
3. 3 variables add (copy-paste):

   **Variable 1:**
   ```
   Key: DATABASE_URL
   Value: (Step 1-ல் copy செய்த URL)
   Environment: All Environments
   ```

   **Variable 2:**
   ```
   Key: NEXTAUTH_URL
   Value: https://rfb-inventory.vercel.app
   Environment: All Environments
   ```

   **Variable 3:**
   ```
   Key: NEXTAUTH_SECRET
   Value: ZKz9DMHsz0DIcraxrtpyX7hrLHHoVjAFAZiZxbDAHTA=
   Environment: All Environments
   ```

## Step 3: Wait (1 நிமிடம்)

- Vercel automatically deploy செய்யும்
- Done! ✅

**Total: 5 நிமிடம்!** 😊
