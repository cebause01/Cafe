# ⚡ Render Quick Start (5 Minutes)

## Step 1: Sign Up
1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest)

## Step 2: Create Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
   - Or paste your repo URL if public

## Step 3: Configure
```
Name: bforbrew-api
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

## Step 4: Add Environment Variables
Click "Advanced" → Add these:

```
MONGODB_URI = mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb

JWT_SECRET = [any random string - make it long and random]

NODE_ENV = production
```

## Step 5: Deploy
1. Click "Create Web Service"
2. Wait 2-5 minutes
3. Copy your URL: `https://your-app.onrender.com`

## Step 6: Update Frontend
Update these 4 files with your Render URL:
- `auth.js`
- `cart.js`
- `wishlist.js`
- `checkout.js`

**Change:**
```javascript
return 'https://your-backend-url.herokuapp.com/api';
```

**To:**
```javascript
return 'https://your-app.onrender.com/api';
```

## ✅ Done!

Your API is live and free! 🎉

**Test it:** `https://your-app.onrender.com/api/auth/me`

---

**Note:** First request after 15 min inactivity takes ~30 seconds. Use UptimeRobot (free) to keep it awake!

