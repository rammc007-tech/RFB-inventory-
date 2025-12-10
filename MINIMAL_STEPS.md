# 😊 மிக எளிய Steps - Stress இல்லாமல்!

## நீங்கள் செய்ய வேண்டியது: **மிக குறைவு!**

### Option 1: Vercel Dashboard-ல் (5 நிமிடம்)

**முதல் Step - Database:**
1. Browser-ல் open: https://vercel.com/storage
2. "Create Database" click
3. "Postgres" select
4. "Hobby" (Free) select  
5. Name: `rfb-inventory-db`
6. Create click
7. **DATABASE_URL copy** (இது மிக important!)

**இரண்டாவது Step - Environment Variables:**
1. Open: https://vercel.com/rammc007-techs-projects/rfb-inventory/settings/environment-variables
2. "Create new" click
3. 3 variables add:

   **1st:**
   - Key: `DATABASE_URL`
   - Value: (மேலே copy செய்த URL)
   - Environment: All
   - Save

   **2nd:**
   - "Add Another" click
   - Key: `NEXTAUTH_URL`  
   - Value: `https://rfb-inventory.vercel.app`
   - Environment: All
   - Save

   **3rd:**
   - "Add Another" click
   - Key: `NEXTAUTH_SECRET`
   - Value: `ZKz9DMHsz0DIcraxrtpyX7hrLHHoVjAFAZiZxbDAHTA=`
   - Environment: All
   - Save

**மூன்றாவது Step - Done!**
- Environment variables set ஆன பிறகு Vercel automatically deploy செய்யும்
- 2-5 நிமிடம் wait செய்யுங்கள்
- ✅ Success!

---

## 💡 Tips

- ஒவ்வொரு step-ஐயும் slowly செய்யுங்கள்
- Copy-paste செய்யும்போது careful
- Error வந்தால், அந்த step-ஐ repeat

**Total: 5 நிமிடம் மட்டும்!** 😊
