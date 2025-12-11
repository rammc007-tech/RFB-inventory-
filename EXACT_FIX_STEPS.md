# 🔧 Exact Fix Steps - Build Error

## Problem
Build is failing because `NEXTAUTH_URL` is missing.

## Solution (2 Steps)

### Step 1: Add NEXTAUTH_URL Variable

1. **Go to Variables page** (you're already there)
2. **Click "Raw Editor" button** (top right)
3. **In the textbox**, you'll see placeholder text like `HELLO=world FOO=bar`
4. **Delete all text** and type exactly this:

```
DATABASE_URL=${{Postgres.DATABASE_URL}}
NEXTAUTH_SECRET=wc0oH9AxJHMduItA7iWzVoQg0nPjK8IqsyEbjI099Iw=
NEXTAUTH_URL=https://placeholder.railway.app
```

5. **Click "Update Variable" button**
6. **Dialog will close automatically**

### Step 2: Wait for Deployment

Railway will automatically start a new deployment. This should succeed now because all required variables are present.

---

**Note**: The `NEXTAUTH_URL` value `https://placeholder.railway.app` is temporary. After the build succeeds, we'll:
1. Generate a real domain in Settings → Networking
2. Update `NEXTAUTH_URL` with the real domain
3. Redeploy

---

**Current Status**:
- ✅ DATABASE_URL: Already added
- ✅ NEXTAUTH_SECRET: Already added  
- ⚠️ NEXTAUTH_URL: Need to add (Step 1 above)

