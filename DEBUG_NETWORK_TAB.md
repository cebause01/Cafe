# 🔍 How to Debug Network Tab Issues

## What to Look For

### ✅ Good Signs:
- Requests to `cafe-whvh.onrender.com` appear in the list
- Status code is `200` (success) or `400` (bad request - but API is working)
- Response shows JSON data

### ❌ Bad Signs:
- No requests to `cafe-whvh.onrender.com` at all
- Status code is `0` or `(failed)`
- Error: "Failed to fetch" or "CORS error"
- Network timeout

## Step-by-Step Debugging

### 1. Filter Network Requests

In the Network tab:
1. Click the filter dropdown
2. Select **"Fetch/XHR"** (this shows only API calls)
3. Clear the list (click the 🚫 icon)
4. Try to sign up again
5. Look for requests to `cafe-whvh.onrender.com`

### 2. Check the API Request

When you click "Sign Up", you should see:
- **Name:** Something like `register` or `https://cafe-whvh.onrender.com/api/auth/register`
- **Method:** `POST`
- **Status:** Should be `200` (success) or `400` (validation error)

### 3. Click on the Request

Click on the request to see details:
- **Headers tab:** Check the request URL is correct
- **Payload tab:** Check the data being sent
- **Response tab:** See what the server returned

### 4. Check Console Tab

Switch to **Console** tab and look for:
- Red error messages
- Any messages about CORS
- Any "Failed to fetch" errors

## Common Issues

### Issue: No requests appear at all
**Cause:** JavaScript error preventing the request
**Fix:** Check Console tab for errors

### Issue: Request shows "Failed" or status 0
**Cause:** 
- Service is sleeping (wait 30 seconds)
- Wrong API URL
- CORS issue
**Fix:** 
1. Wait 30 seconds and try again
2. Verify API URL in code
3. Check CORS settings

### Issue: Status 500 (Internal Server Error)
**Cause:** Backend error
**Fix:** Check Render logs for error details

### Issue: Status 400 (Bad Request)
**Cause:** Validation error (missing fields, etc.)
**Fix:** Check the Response tab to see what's wrong

## Quick Test

1. Open Console tab (not Network)
2. Type this and press Enter:
```javascript
fetch('https://cafe-whvh.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'test123'
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error);
```

**If this works:** Your API is fine, issue is in frontend code
**If this fails:** Check the error message

