# Backend Setup Guide

This application requires a backend server to handle user authentication, cart, wishlist, and orders. The frontend is designed to work with GitHub Pages, but you'll need to host the backend separately.

## Backend Deployment Options

### Option 1: Heroku (Recommended)

1. **Create a Heroku account** at https://www.heroku.com

2. **Install Heroku CLI** from https://devcenter.heroku.com/articles/heroku-cli

3. **Deploy the backend:**
   ```bash
   cd /path/to/your/project
   heroku login
   heroku create your-app-name
   heroku config:set MONGODB_URI="your-mongodb-connection-string"
   heroku config:set JWT_SECRET="your-secret-key-here"
   git push heroku main
   ```

4. **Update API URL in frontend files:**
   - Open `auth.js`, `cart.js`, `wishlist.js`, and `checkout.js`
   - Replace `'https://your-backend-url.herokuapp.com/api'` with your actual Heroku URL
   - Example: `'https://bforbrew-api.herokuapp.com/api'`

### Option 2: Render

1. **Create a Render account** at https://render.com

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `JWT_SECRET`: A random secret key
     - `PORT`: 10000 (or let Render assign it)

3. **Update API URL in frontend files** with your Render URL

### Option 3: Railway

1. **Create a Railway account** at https://railway.app

2. **Create a new project** and connect your repository

3. **Add environment variables** in Railway dashboard

4. **Deploy** and update frontend API URLs

## MongoDB Setup

The application uses MongoDB Atlas (cloud database). Your connection string is already configured:
```
MONGODB_URI=mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb
```

## Local Development

To run the backend locally:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file:**
   ```
   MONGODB_URI=mongodb+srv://zarrr345:YbojWBZ79zqbT23S@bukupb.q2dsnqi.mongodb.net/?retryWrites=true&w=majority&appName=bukupb
   JWT_SECRET=your-secret-key-here
   PORT=3000
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

4. **The API will be available at:** `http://localhost:3000/api`

## Frontend Deployment (GitHub Pages)

1. **Update API URLs** in all frontend files to point to your deployed backend

2. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Update API URLs for production"
   git push origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to Pages section
   - Select main branch and / (root) folder
   - Save

4. **Your site will be available at:** `https://yourusername.github.io/repository-name`

## Important Notes

- **CORS**: The backend is configured to allow requests from any origin. For production, consider restricting this to your GitHub Pages domain.
- **JWT Secret**: Use a strong, random secret key in production. Never commit secrets to GitHub.
- **MongoDB**: Ensure your MongoDB Atlas IP whitelist includes your backend server's IP (or use 0.0.0.0/0 for all IPs during development).

## API Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)
- `GET /api/cart` - Get user's cart (requires auth)
- `POST /api/cart/add` - Add item to cart (requires auth)
- `PUT /api/cart/update` - Update cart item (requires auth)
- `DELETE /api/cart/remove/:productId` - Remove item from cart (requires auth)
- `DELETE /api/cart/clear` - Clear cart (requires auth)
- `GET /api/wishlist` - Get user's wishlist (requires auth)
- `POST /api/wishlist/add` - Add item to wishlist (requires auth)
- `DELETE /api/wishlist/remove/:productId` - Remove item from wishlist (requires auth)
- `POST /api/wishlist/toggle` - Toggle wishlist item (requires auth)
- `POST /api/orders/create` - Create new order (requires auth)
- `GET /api/orders` - Get user's orders (requires auth)
- `GET /api/orders/:orderNumber` - Get order by number (requires auth)

