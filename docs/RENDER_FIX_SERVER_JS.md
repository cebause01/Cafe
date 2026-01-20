# 🔧 Fix: "Cannot find module '/opt/render/project/src/server.js'"

## The Problem
Render is looking for `server.js` in the wrong location. Your server is in `backend/server.js`, but Render expects it at the root.

## The Solution

### Option 1: Use render.yaml (Automatic)
I've created a `render.yaml` file in your project root. If Render supports it, it will automatically configure everything correctly.

### Option 2: Manual Configuration (Recommended)

1. **Go to Render Dashboard**
   - Open your service
   - Click "Settings"

2. **Set Root Directory**
   - Find "Root Directory" field
   - Set it to: `backend`
   - Click "Save Changes"

3. **Verify Build & Start Commands**
   - Build Command: `npm install` (or leave empty)
   - Start Command: `npm start`

4. **Redeploy**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Or push a new commit to trigger auto-deploy

## What This Does

- **Root Directory: `backend`** tells Render to:
  - Look for `package.json` in `backend/` folder
  - Look for `server.js` in `backend/` folder
  - Run `npm install` in `backend/` folder
  - Run `npm start` in `backend/` folder

## Verify It Works

After redeploying, check the logs. You should see:
```
✅ Connected to MongoDB
✅ Server is running on port XXXX
```

Instead of:
```
❌ Error: Cannot find module '/opt/render/project/src/server.js'
```

## Still Having Issues?

1. Check that `backend/server.js` exists
2. Check that `backend/package.json` exists
3. Verify Root Directory is set to `backend` (not `backend/` with trailing slash)
4. Check Render logs for any other errors
