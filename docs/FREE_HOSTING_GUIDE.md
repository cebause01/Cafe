# 🆓 Free Hosting Guide

Yes! You can host this completely free. Here are the best free options:

## 🥇 Option 1: Render (Recommended - Easiest)

**Free Tier Includes:**
- ✅ 750 hours/month (enough for always-on)
- ✅ Free SSL certificate
- ✅ Automatic deployments from GitHub
- ✅ Spins down after 15 min inactivity (wakes up on first request)

### Quick Setup:

1. **Sign up at Render.com** (free)

2. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Or manually deploy

3. **Configure:**
   - **Name:** `bforbrew-api` (or any name)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. **Add Environment Variables:**
   - `MONGODB_URI` = `mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb`
   - `JWT_SECRET` = `your-random-secret-key-here`
   - `NODE_ENV` = `production`

5. **Deploy!**
   - Render will automatically deploy
   - Your API will be at: `https://your-app-name.onrender.com`

6. **Update Frontend:**
   - Update `auth.js`, `cart.js`, `wishlist.js`, `checkout.js`
   - Change API URL to: `https://your-app-name.onrender.com/api`

**Note:** First request after inactivity takes ~30 seconds (cold start). Subsequent requests are fast.

---

## 🥈 Option 2: Railway

**Free Tier Includes:**
- ✅ $5 credit/month (usually enough for small apps)
- ✅ Always-on service
- ✅ Easy GitHub integration

### Quick Setup:

1. **Sign up at Railway.app** (free)

2. **Create New Project:**
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Select your repository

3. **Configure:**
   - Railway auto-detects Node.js
   - Add environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
   - Deploy!

4. **Get your URL:**
   - Railway provides a URL like: `https://your-app.up.railway.app`

5. **Update Frontend** with Railway URL

---

## 🥉 Option 3: Fly.io

**Free Tier Includes:**
- ✅ 3 shared VMs
- ✅ 3GB persistent volumes
- ✅ Always-on option

### Quick Setup:

1. **Install Fly CLI:**
   ```bash
   # Windows: Use PowerShell
   iwr https://fly.io/install.ps1 -useb | iex
   
   # Mac/Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login:**
   ```bash
   fly auth login
   ```

3. **Create app:**
   ```bash
   fly launch
   ```

4. **Set secrets:**
   ```bash
   fly secrets set MONGODB_URI="your-connection-string"
   fly secrets set JWT_SECRET="your-secret"
   ```

5. **Deploy:**
   ```bash
   fly deploy
   ```

---

## 🎯 Option 4: Cyclic.sh

**Free Tier Includes:**
- ✅ Always-on Node.js hosting
- ✅ Automatic deployments
- ✅ Free SSL

### Quick Setup:

1. **Sign up at Cyclic.sh**

2. **Connect GitHub repo**

3. **Auto-deploys!** (Cyclic detects Node.js automatically)

4. **Add environment variables in dashboard**

5. **Get your URL:** `https://your-app.cyclic.app`

---

## 📊 Comparison

| Service | Free Tier | Always-On | Cold Start | Ease |
|---------|-----------|-----------|------------|------|
| **Render** | 750 hrs/mo | ❌ (15min sleep) | ~30s | ⭐⭐⭐⭐⭐ |
| **Railway** | $5 credit | ✅ | None | ⭐⭐⭐⭐ |
| **Fly.io** | 3 VMs | ✅ | None | ⭐⭐⭐ |
| **Cyclic** | Unlimited | ✅ | None | ⭐⭐⭐⭐⭐ |

## 🚀 Recommended: Render

**Why Render?**
- ✅ Easiest setup (just connect GitHub)
- ✅ Free tier is generous
- ✅ Similar to Heroku (familiar)
- ✅ Automatic SSL
- ✅ Good documentation

**Trade-off:** 30-second cold start after inactivity (but free!)

---

## 📝 Step-by-Step: Render (Detailed)

### 1. Create Account
- Go to https://render.com
- Sign up with GitHub (easiest)

### 2. Create Web Service
- Dashboard → "New +" → "Web Service"
- Connect GitHub repository
- Or use "Public Git repository" and paste your repo URL

### 3. Configure Service
```
Name: bforbrew-api
Environment: Node
Region: Singapore (or closest to you)
Branch: main (or master)
Root Directory: (leave empty)
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 4. Environment Variables
Click "Advanced" → "Add Environment Variable":

```
Key: MONGODB_URI
Value: mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb

Key: JWT_SECRET
Value: [generate a random string]

Key: NODE_ENV
Value: production
```

### 5. Deploy
- Click "Create Web Service"
- Wait 2-5 minutes for first deployment
- Watch the logs for any errors

### 6. Get Your URL
- After deployment, you'll see: `https://bforbrew-api.onrender.com`
- Test it: `https://bforbrew-api.onrender.com/api/auth/me`

### 7. Update Frontend
In these 4 files, replace the API URL:
- `auth.js`
- `cart.js`
- `wishlist.js`
- `checkout.js`

**Find:**
```javascript
return 'https://your-backend-url.herokuapp.com/api';
```

**Replace with:**
```javascript
return 'https://bforbrew-api.onrender.com/api';
```

---

## ✅ Testing

After deployment:

1. **Check logs** in Render dashboard
2. **Test API:** Open `https://your-app.onrender.com/api/auth/me` (should show error, but means it's working)
3. **Test registration** from your frontend
4. **Test login**
5. **Test cart/wishlist**

---

## 💡 Pro Tips

1. **Keep Render service awake:**
   - Use a free service like UptimeRobot to ping your API every 5 minutes
   - This prevents cold starts

2. **Monitor usage:**
   - Render dashboard shows your hours used
   - 750 hours = ~31 days (enough for always-on if you keep it awake)

3. **Free alternatives if you hit limits:**
   - Railway ($5 credit usually lasts all month)
   - Fly.io (3 free VMs)

---

## 🎉 You're Done!

Your app is now **100% free** and fully functional!

**Frontend:** GitHub Pages (free)  
**Backend:** Render/Railway/Fly.io (free)  
**Database:** MongoDB Atlas (free tier)

---

**Need help?** Check Render docs: https://render.com/docs

