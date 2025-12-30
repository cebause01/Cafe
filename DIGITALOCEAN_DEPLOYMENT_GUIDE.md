# Complete DigitalOcean Deployment Guide

This guide will walk you through deploying your BforBrew backend to DigitalOcean.

## Option 1: App Platform (Recommended - Easiest)

DigitalOcean App Platform is similar to Heroku - it's a Platform-as-a-Service (PaaS) that handles everything for you.

### Prerequisites

- A DigitalOcean account (Sign up at https://www.digitalocean.com)
- Your project files ready
- GitHub account (recommended) or Git repository

### Step 1: Create DigitalOcean Account

1. Go to https://www.digitalocean.com
2. Click "Sign Up"
3. Complete registration (you can use GitHub to sign up faster)
4. Verify your email

### Step 2: Prepare Your Repository

**Option A: Using GitHub (Recommended)**

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Ready for DigitalOcean deployment"
   git push origin main
   ```

2. Make sure your repository is public or you've connected your GitHub account to DigitalOcean

**Option B: Using Git directly**

- Have your Git repository ready locally

### Step 3: Create App on App Platform

1. **Login to DigitalOcean Dashboard**
   - Go to https://cloud.digitalocean.com
   - Click "Create" → "Apps"

2. **Connect Repository**
   - Click "GitHub" (or "GitLab" if using that)
   - Authorize DigitalOcean to access your repositories
   - Select your repository
   - Choose the branch (usually `main` or `master`)

3. **Configure App**
   - **Name**: Give your app a name (e.g., `bforbrew-api`)
   - **Region**: Choose closest to your users (e.g., `New York`, `Singapore`)
   - **Build Command**: Leave empty (or `npm install` if needed)
   - **Run Command**: `npm start`
   - **Environment**: Select "Node.js"

4. **Set Environment Variables**
   Click "Edit" next to Environment Variables and add:
   
   ```
   MONGODB_URI = mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb
   JWT_SECRET = your-random-secret-key-here-make-it-long
   NODE_ENV = production
   ```

5. **Configure Resources**
   - **Plan**: Start with "Basic" ($5/month) or "Starter" (Free tier available)
   - **Instance Size**: Basic plan is fine to start
   - **Instance Count**: 1 (you can scale later)

6. **Review & Create**
   - Review your settings
   - Click "Create Resources"

### Step 4: Wait for Deployment

- DigitalOcean will:
  1. Clone your repository
  2. Install dependencies (`npm install`)
  3. Build your app
  4. Deploy it

- This takes 2-5 minutes
- Watch the build logs in real-time

### Step 5: Get Your App URL

Once deployed, you'll see:
- **App URL**: `https://your-app-name.ondigitalocean.app`
- **API URL**: `https://your-app-name.ondigitalocean.app/api`

**Save this URL!** You'll need it for your frontend.

### Step 6: Update Frontend API URLs

Update these 4 files with your DigitalOcean App URL:

1. **auth.js**
2. **cart.js**
3. **wishlist.js**
4. **checkout.js**

**Find this line:**
```javascript
return 'https://your-backend-url.herokuapp.com/api';
```

**Replace with:**
```javascript
return 'https://your-app-name.ondigitalocean.app/api';
```

### Step 7: Test Your Deployment

1. **Check App Status**
   - Go to your App in DigitalOcean dashboard
   - Should show "Live" status

2. **Test API Endpoint**
   - Open: `https://your-app-name.ondigitalocean.app/api/auth/me`
   - Should return an error (expected - needs auth), but confirms server is running

3. **View Logs**
   - Click "Runtime Logs" in your app dashboard
   - Look for: ✅ "Connected to MongoDB" and ✅ "Server is running"

---

## Option 2: Droplet (VPS - More Control)

If you want more control or lower costs, you can use a Droplet (Virtual Private Server).

### Prerequisites

- DigitalOcean account
- Basic command line knowledge
- SSH access

### Step 1: Create a Droplet

1. **Go to DigitalOcean Dashboard**
   - Click "Create" → "Droplets"

2. **Choose Configuration**
   - **Image**: Ubuntu 22.04 (LTS)
   - **Plan**: Basic ($6/month for 1GB RAM is enough to start)
   - **Region**: Choose closest to you
   - **Authentication**: 
     - **Option A**: SSH keys (recommended - more secure)
     - **Option B**: Password (easier setup)
   - **Hostname**: `bforbrew-api` (or any name)

3. **Create Droplet**
   - Click "Create Droplet"
   - Wait 1-2 minutes for it to be ready

### Step 2: Connect to Your Droplet

**Get your Droplet IP** from the dashboard, then:

**Windows (PowerShell or Git Bash):**
```bash
ssh root@YOUR_DROPLET_IP
```

**Mac/Linux:**
```bash
ssh root@YOUR_DROPLET_IP
```

Enter password if using password authentication.

### Step 3: Set Up Node.js

Once connected to your Droplet:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js (using NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node -v
npm -v

# Install PM2 (process manager)
npm install -g pm2

# Install Git
apt install -y git
```

### Step 4: Clone Your Repository

```bash
# Create app directory
mkdir -p /var/www/bforbrew-api
cd /var/www/bforbrew-api

# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git .

# Or if you haven't pushed to GitHub, use SCP to upload files
```

### Step 5: Install Dependencies

```bash
cd /var/www/bforbrew-api
npm install
```

### Step 6: Set Up Environment Variables

```bash
# Create .env file
nano .env
```

Add:
```
MONGODB_URI=mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb
JWT_SECRET=your-random-secret-key-here
NODE_ENV=production
PORT=3000
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### Step 7: Start Your App with PM2

```bash
# Start app with PM2
pm2 start server.js --name bforbrew-api

# Make PM2 start on boot
pm2 startup
pm2 save

# Check status
pm2 status
pm2 logs bforbrew-api
```

### Step 8: Set Up Nginx (Reverse Proxy)

```bash
# Install Nginx
apt install -y nginx

# Create Nginx config
nano /etc/nginx/sites-available/bforbrew-api
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name YOUR_DROPLET_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Save and enable:
```bash
# Create symlink
ln -s /etc/nginx/sites-available/bforbrew-api /etc/nginx/sites-enabled/

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
```

### Step 9: Set Up Firewall

```bash
# Allow SSH, HTTP, and HTTPS
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw enable
```

### Step 10: Set Up Domain (Optional)

If you have a domain:

1. **Point DNS to your Droplet IP**
   - Add A record: `@` → `YOUR_DROPLET_IP`
   - Add A record: `api` → `YOUR_DROPLET_IP` (for api.yourdomain.com)

2. **Update Nginx config** with your domain name

3. **Set up SSL with Let's Encrypt:**
   ```bash
   apt install -y certbot python3-certbot-nginx
   certbot --nginx -d yourdomain.com -d api.yourdomain.com
   ```

### Step 11: Update Frontend

Update your frontend files with:
- **IP address**: `http://YOUR_DROPLET_IP/api`
- **Or domain**: `https://api.yourdomain.com/api`

---

## Comparison: App Platform vs Droplet

### App Platform (Recommended for Beginners)
✅ **Pros:**
- Easy setup (5 minutes)
- Automatic deployments
- Built-in SSL
- Auto-scaling
- No server management

❌ **Cons:**
- More expensive ($5-12/month minimum)
- Less control

### Droplet
✅ **Pros:**
- More control
- Lower cost ($6/month)
- Learn server management
- Can host multiple apps

❌ **Cons:**
- More setup required
- You manage everything
- Need to set up SSL yourself

---

## Updating Your App

### App Platform:
- Just push to GitHub
- DigitalOcean auto-deploys

### Droplet:
```bash
ssh root@YOUR_DROPLET_IP
cd /var/www/bforbrew-api
git pull
npm install
pm2 restart bforbrew-api
```

---

## Useful Commands

### App Platform:
- View logs: Dashboard → Your App → Runtime Logs
- Restart: Dashboard → Your App → Actions → Restart

### Droplet:
```bash
# View logs
pm2 logs bforbrew-api

# Restart app
pm2 restart bforbrew-api

# Stop app
pm2 stop bforbrew-api

# View status
pm2 status

# Monitor
pm2 monit
```

---

## Troubleshooting

### App Platform Issues

**Build fails:**
- Check build logs in dashboard
- Verify `package.json` has correct scripts
- Ensure all dependencies are listed

**App crashes:**
- Check runtime logs
- Verify environment variables are set
- Check MongoDB connection

### Droplet Issues

**Can't connect via SSH:**
- Check firewall: `ufw status`
- Verify SSH is allowed: `ufw allow 22`

**App not accessible:**
- Check if app is running: `pm2 status`
- Check Nginx: `systemctl status nginx`
- Check logs: `pm2 logs bforbrew-api`

**Port already in use:**
- Check what's using port 3000: `lsof -i :3000`
- Kill process if needed: `kill -9 PID`

---

## Cost Comparison

### App Platform:
- **Starter**: Free (limited)
- **Basic**: $5/month
- **Professional**: $12/month+

### Droplet:
- **Basic**: $6/month (1GB RAM)
- **General Purpose**: $12/month (2GB RAM)

**Recommendation:** Start with App Platform for ease, switch to Droplet if you need more control or lower costs.

---

## Next Steps

1. ✅ Choose deployment method (App Platform recommended)
2. ✅ Deploy backend
3. ✅ Get your API URL
4. ✅ Update frontend files with API URL
5. ✅ Test everything
6. ✅ Deploy frontend to GitHub Pages

---

**Your API will be available at:**
- **App Platform**: `https://your-app-name.ondigitalocean.app/api`
- **Droplet**: `http://YOUR_DROPLET_IP/api` or `https://api.yourdomain.com/api`

**Remember to update all frontend files with this URL!**

