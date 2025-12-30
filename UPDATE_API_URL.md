# 🔧 How to Update Your API URL

## Step 1: Find Your Render URL

1. Go to https://dashboard.render.com
2. Click on your service
3. Look at the top - you'll see your URL:
   - Example: `https://bforbrew-api.onrender.com`
   - **Copy this URL!**

## Step 2: Update These 4 Files

You need to update the API URL in these files:
- `auth.js`
- `cart.js`
- `wishlist.js`
- `checkout.js`

### In Each File, Find This Line:

```javascript
return 'https://your-backend-url.herokuapp.com/api';
```

### Replace With Your Render URL:

```javascript
return 'https://YOUR-APP-NAME.onrender.com/api';
```

**Example:** If your Render URL is `https://bforbrew-api.onrender.com`, change to:
```javascript
return 'https://bforbrew-api.onrender.com/api';
```

## Step 3: Test

1. Save all files
2. Refresh your website
3. Try to login
4. Check browser console (F12) for errors

---

## Quick Find & Replace

If you have many files, use Find & Replace in your editor:

**Find:**
```
https://your-backend-url.herokuapp.com/api
```

**Replace with:**
```
https://YOUR-ACTUAL-RENDER-URL.onrender.com/api
```

---

## Still Not Working?

1. Make sure your Render service is "Live" (green status)
2. Test API directly: Open `https://your-app.onrender.com/api/auth/me` in browser
3. Check Render logs for errors
4. See `TROUBLESHOOTING_RENDER.md` for more help

