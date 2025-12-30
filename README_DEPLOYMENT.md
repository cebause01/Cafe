# Deployment Instructions for GitHub Pages

## Quick Setup

1. **Deploy Backend First:**
   - Follow instructions in `BACKEND_SETUP.md` to deploy your backend (Heroku, Render, etc.)
   - Note your backend URL (e.g., `https://bforbrew-api.herokuapp.com`)

2. **Update Frontend API URLs:**
   - Open these files: `auth.js`, `cart.js`, `wishlist.js`, `checkout.js`
   - Find the line: `return 'https://your-backend-url.herokuapp.com/api';`
   - Replace with your actual backend URL
   - Example: `return 'https://bforbrew-api.herokuapp.com/api';`

3. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for GitHub Pages deployment"
   git push origin main
   ```

4. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main` / `(root)`
   - Click Save

5. **Your site will be live at:**
   `https://yourusername.github.io/repository-name`

## Features

✅ **User Authentication**: Sign up and login to save your data
✅ **Cart**: Works as guest, but sign in to save across devices
✅ **Wishlist**: Requires sign-in to use
✅ **Orders**: Track your order history when signed in
✅ **Responsive**: Works on all devices

## Important Notes

- The frontend is static and hosted on GitHub Pages
- The backend must be hosted separately (Heroku, Render, Railway, etc.)
- Make sure to update all API URLs before deploying
- MongoDB connection is already configured

## Testing Locally

1. Start backend: `npm start` (in project root)
2. Open `index.html` in browser or use a local server
3. Backend should be running on `http://localhost:3000`

