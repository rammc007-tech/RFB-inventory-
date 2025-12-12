# ❌ Failed காரணம் - குறிப்பிட்ட பிரச்சனை

## 🔍 குறிப்பிட்ட காரணம்:

**nixpacks.toml-ல் export commands தனித்தனியாக run ஆகி, environment variables `next build`-க்கு கிடைக்கவில்லை.**

### Problem:
```toml
[phases.build]
cmds = [
  "export NODE_ENV=production",           # ❌ இது தனியாக run ஆகும்
  "export NEXTAUTH_URL=...",              # ❌ இது தனியாக run ஆகும்
  "next build"                            # ❌ Environment variables கிடைக்காது
]
```

### Why It Fails:
- Nixpacks-ல் ஒவ்வொரு command-ம் தனி shell-ல் run ஆகும்
- `export` command-ன் variables அடுத்த command-க்கு persist ஆகாது
- `next build` environment variables இல்லாமல் run ஆகிறது
- Build fail ஆகிறது (2 seconds-ல்)

### Fix:
Export-ஐ `next build`-உடன் ஒரே command-ஆக combine செய்யவும்.

