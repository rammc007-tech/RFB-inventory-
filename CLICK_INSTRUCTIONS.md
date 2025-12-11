# 🖱️ Click Instructions - Add DATABASE_URL

## Current Status
✅ PostgreSQL variables list is visible
✅ DATABASE_URL is in the list

## Next Step - Add DATABASE_URL Reference

**Look at the top of the Variables page. You should see a form with:**

1. **"VARIABLE_NAME"** - A dropdown/input field
2. **"Add Reference"** - A button
3. **"VALUE or ${{REF}}"** - An input field
4. **"Add"** button
5. **"Cancel"** button

### Option 1: Using Add Reference Button
1. Click **"Add Reference"** button
2. Select **"Postgres"** service
3. Select **"DATABASE_URL"** variable
4. Click **"Add"** or **"Save"**

### Option 2: Manual Entry
1. In **"VARIABLE_NAME"** field, type: `DATABASE_URL`
2. In **"VALUE or ${{REF}}"** field, type: `${{Postgres.DATABASE_URL}}`
3. Click **"Add"** button

---

**After clicking, tell me what happens!**

