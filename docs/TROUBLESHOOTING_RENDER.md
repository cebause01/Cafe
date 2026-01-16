# 🔧 Troubleshooting "Failed to Fetch" on Render

## Quick Fixes (Try These First)

### 1. ✅ Update API URL in Frontend Files

**This is the most common issue!** You need to update 4 files with your Render URL.

**Your Render URL looks like:** `https://your-app-name.onrender.com`

**Files to update:**
- `auth.js`
- `cart.js`
- `wishlist.js`
- `checkout.js`

**Find this line in each file:**
```javascript
return 'https://your-backend-url.herokuapp.com/api';
```

**Replace with your actual Render URL:**
```javascript
return 'https://your-app-name.onrender.com/api';
```

**Example:** If your Render app is `bforbrew-api`, it should be:
```javascript
return 'https://bforbrew-api.onrender.com/api';
```

---

### 2. ✅ Check Render Service is Running

1. Go to Render dashboard
2. Click on your service
3. Check "Events" tab - should show "Deployed successfully"
4. Check "Logs" tab - should show:
   - ✅ "Connected to MongoDB"
   - ✅ "Server is running on port XXXX"

**If you see errors, fix them first!**

---

### 3. ✅ Test Your API Directly

Open in browser: `https://your-app-name.onrender.com/api/auth/me`

**Expected:** Should show an error (that's OK - means API is working)
**If you get:** "Site can't be reached" or timeout → Service might be sleeping

**Solution:** Wait 30 seconds and try again (cold start)

---

### 4. ✅ Check Environment Variables

In Render dashboard → Your Service → "Environment":

**Required variables:**
- ✅ `MONGODB_URI` = `mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb`
- ✅ `JWT_SECRET` = (any random string)
- ✅ `NODE_ENV` = `production` (optional but recommended)

**If missing, add them and redeploy!**

---

### 5. ✅ Improve CORS Configuration

Update `server.js` to allow your frontend domain:

```javascript
// Replace this line:
app.use(cors());

// With this:
app.use(cors({
    origin: ['https://your-username.github.io', 'http://localhost:8000', 'http://127.0.0.1:5500'],
    credentials: true
}));
```

**Or allow all origins (for testing):**
```javascript
app.use(cors({
    origin: '*',
    credentials: true
}));
```

---

### 6. ✅ Check Browser Console

1. Open your website
2. Press F12 (Developer Tools)
3. Go to "Console" tab
4. Try to login
5. Look for error messages

**Common errors:**
- `Failed to fetch` → API URL wrong or service down
- `CORS error` → CORS not configured
- `Network error` → Service sleeping (wait 30s)

---

### 7. ✅ Check Network Tab

1. Open Developer Tools (F12)
2. Go to "Network" tab
3. Try to login
4. Look for the request to `/api/auth/login`
5. Click on it to see details

**Check:**
- **Status:** Should be 200 or 400 (not failed)
- **Request URL:** Should be your Render URL
- **Response:** Should show JSON (not empty)

---

## Step-by-Step Debugging

### Step 1: Verify Render Service
```bash
# Check if service is up
curl https://your-app-name.onrender.com/api/auth/me
```

**Should return:** JSON error (that's OK!)

### Step 2: Check Frontend API URL
Open browser console and type:
```javascript
// Check what API URL is being used
console.log(API_BASE_URL);
```

**Should show:** `https://your-app-name.onrender.com/api`

### Step 3: Test API Endpoint
Try this in browser console:
```javascript
fetch('https://your-app-name.onrender.com/api/auth/me')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

**If this works:** Frontend code issue
**If this fails:** Backend issue

---

## Common Issues & Solutions

### Issue: "Failed to fetch" immediately
**Cause:** Wrong API URL or service not deployed
**Fix:** 
1. Check API URL in frontend files
2. Verify service is deployed on Render

### Issue: Works after 30 seconds
**Cause:** Service was sleeping (cold start)
**Fix:** 
- This is normal for free tier
- Use UptimeRobot to keep it awake (free)

### Issue: CORS error in console
**Cause:** CORS not configured properly
**Fix:** Update `server.js` CORS config (see #5 above)

### Issue: "Cannot connect to MongoDB"
**Cause:** MongoDB connection string wrong or network issue
**Fix:** 
1. Check `MONGODB_URI` in Render environment variables
2. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)

### Issue: "401 Unauthorized" or "403 Forbidden"
**Cause:** JWT_SECRET not set or wrong
**Fix:** 
1. Set `JWT_SECRET` in Render environment variables
2. Redeploy service

---

## Quick Checklist

- [ ] API URL updated in all 4 frontend files
- [ ] Render service shows "Live" status
- [ ] Environment variables set correctly
- [ ] Service logs show "Connected to MongoDB"
- [ ] Can access API directly in browser
- [ ] CORS configured properly
- [ ] Browser console checked for errors

---

## Still Not Working?

1. **Share your Render URL** (so I can check)
2. **Share browser console errors** (F12 → Console)
3. **Share Render logs** (from Render dashboard)

---

## Test Your Setup

After fixing, test this:

1. **Open your website**
2. **Open browser console (F12)**
3. **Try to register a new user:**
   - Email: `test@example.com`
   - Password: `test123`
   - Name: `Test User`
4. **Check console for errors**
5. **Check Network tab for API calls**

**If registration works:** ✅ Everything is fixed!
**If still failing:** Check the error message and follow solutions above.

