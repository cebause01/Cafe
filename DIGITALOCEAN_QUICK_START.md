# DigitalOcean Quick Start Checklist

## Option 1: App Platform (Easiest - Recommended) ⭐

### ✅ Pre-Deployment
- [ ] DigitalOcean account created
- [ ] Code pushed to GitHub
- [ ] GitHub account connected to DigitalOcean

### ✅ Deployment Steps

1. **Create App**
   - Dashboard → Create → Apps
   - Connect GitHub repository
   - Select your repo and branch

2. **Configure App**
   - Name: `bforbrew-api`
   - Region: Choose closest
   - Build Command: (leave empty)
   - Run Command: `npm start`
   - Environment: Node.js

3. **Set Environment Variables**
   ```
   MONGODB_URI = mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb
   JWT_SECRET = your-random-secret-key
   NODE_ENV = production
   ```

4. **Deploy**
   - Click "Create Resources"
   - Wait 2-5 minutes
   - Get your URL: `https://your-app-name.ondigitalocean.app`

5. **Update Frontend**
   - [ ] Update `auth.js` with API URL
   - [ ] Update `cart.js` with API URL
   - [ ] Update `wishlist.js` with API URL
   - [ ] Update `checkout.js` with API URL

6. **Test**
   - [ ] Check app is live
   - [ ] Test API endpoint
   - [ ] Test user registration
   - [ ] Test login

---

## Option 2: Droplet (More Control)

### ✅ Setup Steps

1. **Create Droplet**
   - [ ] Ubuntu 22.04
   - [ ] $6/month plan
   - [ ] Choose region
   - [ ] SSH key or password

2. **Connect via SSH**
   ```bash
   ssh root@YOUR_DROPLET_IP
   ```

3. **Install Dependencies**
   ```bash
   apt update && apt upgrade -y
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs git nginx
   npm install -g pm2
   ```

4. **Deploy App**
   ```bash
   mkdir -p /var/www/bforbrew-api
   cd /var/www/bforbrew-api
   git clone YOUR_REPO_URL .
   npm install
   ```

5. **Set Environment**
   ```bash
   nano .env
   # Add MONGODB_URI, JWT_SECRET, NODE_ENV, PORT
   ```

6. **Start App**
   ```bash
   pm2 start server.js --name bforbrew-api
   pm2 startup
   pm2 save
   ```

7. **Configure Nginx**
   - [ ] Create config file
   - [ ] Enable site
   - [ ] Restart Nginx

8. **Update Frontend**
   - [ ] Update API URLs to `http://YOUR_DROPLET_IP/api`

---

## Quick Reference

### App Platform URL Format
```
https://your-app-name.ondigitalocean.app/api
```

### Droplet URL Format
```
http://YOUR_DROPLET_IP/api
# or with domain:
https://api.yourdomain.com/api
```

### Update Frontend Files
Replace in `auth.js`, `cart.js`, `wishlist.js`, `checkout.js`:
```javascript
// Find:
return 'https://your-backend-url.herokuapp.com/api';

// Replace with:
return 'https://your-app-name.ondigitalocean.app/api';
```

---

## Need Help?

- **Detailed Guide**: See `DIGITALOCEAN_DEPLOYMENT_GUIDE.md`
- **DigitalOcean Docs**: https://docs.digitalocean.com/
- **Support**: https://www.digitalocean.com/support

---

**Recommended:** Start with App Platform for easiest deployment! 🚀

