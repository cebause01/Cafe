# Testing MongoDB Data Saving

## Quick Test Steps

### 1. Test User Registration (Saves to MongoDB)

1. **Register a new user** on your website
2. **Check Render logs:**
   - Go to https://dashboard.render.com
   - Click on your service
   - Go to "Logs" tab
   - Look for: `"User created successfully"` or any errors

3. **Test in Browser Console:**
   ```javascript
   // After registering, check if user data is saved
   fetch('https://cafe-whvh.onrender.com/api/auth/me', {
     headers: {
       'Authorization': 'Bearer ' + localStorage.getItem('authToken')
     }
   })
   .then(r => r.json())
   .then(console.log)
   .catch(console.error);
   ```

### 2. Test Cart Saving

1. **Login to your account**
2. **Add items to cart** (2-3 products)
3. **Check in Browser Console:**
   ```javascript
   // Get your cart from database
   fetch('https://cafe-whvh.onrender.com/api/cart', {
     headers: {
       'Authorization': 'Bearer ' + localStorage.getItem('authToken')
     }
   })
   .then(r => r.json())
   .then(data => {
     console.log('Cart from MongoDB:', data);
     console.log('Number of items:', data.cart.length);
   })
   .catch(console.error);
   ```

4. **Refresh the page** - cart should still be there (saved in MongoDB)

### 3. Test Wishlist Saving

1. **Add items to wishlist** (while logged in)
2. **Check in Browser Console:**
   ```javascript
   // Get your wishlist from database
   fetch('https://cafe-whvh.onrender.com/api/wishlist', {
     headers: {
       'Authorization': 'Bearer ' + localStorage.getItem('authToken')
     }
   })
   .then(r => r.json())
   .then(data => {
     console.log('Wishlist from MongoDB:', data);
     console.log('Number of items:', data.wishlist.length);
   })
   .catch(console.error);
   ```

3. **Refresh the page** - wishlist should still be there

### 4. Test Order Saving

1. **Add items to cart**
2. **Go to checkout** and complete an order
3. **Check in Browser Console:**
   ```javascript
   // Get your orders from database
   fetch('https://cafe-whvh.onrender.com/api/orders', {
     headers: {
       'Authorization': 'Bearer ' + localStorage.getItem('authToken')
     }
   })
   .then(r => r.json())
   .then(data => {
     console.log('Orders from MongoDB:', data);
     console.log('Number of orders:', data.orders.length);
   })
   .catch(console.error);
   ```

## Verify in MongoDB Atlas

### Option 1: MongoDB Atlas Web Interface

1. **Go to:** https://cloud.mongodb.com
2. **Login** to your MongoDB Atlas account
3. **Navigate to:** Clusters → Browse Collections
4. **Select your database** (usually `test` or the database name from your connection string)
5. **Look for collections:**
   - `users` - Contains all user data (cart, wishlist, orders)
   - `orders` - Contains all orders

6. **Check a user document:**
   - Click on `users` collection
   - Find your user (by email)
   - Verify:
     - ✅ `cart` array has items
     - ✅ `wishlist` array has product IDs
     - ✅ `orders` array has order references

### Option 2: Check Render Logs

1. **Go to Render dashboard**
2. **Click on your service**
3. **Go to "Logs" tab**
4. **Look for:**
   - ✅ `"Connected to MongoDB"` - Connection successful
   - ✅ `"Item added to cart"` - Cart saves working
   - ✅ `"Item added to wishlist"` - Wishlist saves working
   - ✅ `"Order created successfully"` - Orders saving

## Common Issues

### Issue: Data not saving

**Check:**
1. ✅ Are you logged in? (Cart/wishlist only save when logged in)
2. ✅ Check browser console for errors
3. ✅ Check Render logs for backend errors
4. ✅ Verify MongoDB connection in Render logs

### Issue: "User not found" error

**Cause:** Token expired or invalid
**Fix:** Log out and log back in

### Issue: Cart/wishlist empty after refresh

**Check:**
1. ✅ Are you logged in?
2. ✅ Check if data is in MongoDB (use test scripts above)
3. ✅ Check if frontend is loading data from API correctly

## Expected Behavior

### ✅ When Logged In:
- Cart saves to MongoDB
- Wishlist saves to MongoDB
- Orders save to MongoDB
- Data persists across devices/browsers
- Data persists after page refresh

### ✅ When Not Logged In (Guest):
- Cart uses localStorage (temporary)
- Wishlist requires login
- Orders can be placed but won't be tracked

## Quick Verification Script

Paste this in your browser console after logging in:

```javascript
// Complete test - checks all data
async function testMongoDBSaving() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        console.error('❌ Not logged in!');
        return;
    }
    
    const headers = {
        'Authorization': 'Bearer ' + token
    };
    
    console.log('🧪 Testing MongoDB Saving...\n');
    
    // Test User
    try {
        const userRes = await fetch('https://cafe-whvh.onrender.com/api/auth/me', { headers });
        const user = await userRes.json();
        console.log('✅ User:', user.user?.email || user.user?.name);
    } catch (e) {
        console.error('❌ User error:', e);
    }
    
    // Test Cart
    try {
        const cartRes = await fetch('https://cafe-whvh.onrender.com/api/cart', { headers });
        const cart = await cartRes.json();
        console.log('✅ Cart items:', cart.cart?.length || 0);
        if (cart.cart?.length > 0) {
            console.log('   Items:', cart.cart.map(i => i.name));
        }
    } catch (e) {
        console.error('❌ Cart error:', e);
    }
    
    // Test Wishlist
    try {
        const wishRes = await fetch('https://cafe-whvh.onrender.com/api/wishlist', { headers });
        const wish = await wishRes.json();
        console.log('✅ Wishlist items:', wish.wishlist?.length || 0);
    } catch (e) {
        console.error('❌ Wishlist error:', e);
    }
    
    // Test Orders
    try {
        const orderRes = await fetch('https://cafe-whvh.onrender.com/api/orders', { headers });
        const orders = await orderRes.json();
        console.log('✅ Orders:', orders.orders?.length || 0);
    } catch (e) {
        console.error('❌ Orders error:', e);
    }
    
    console.log('\n✅ Test complete!');
}

testMongoDBSaving();
```

## Summary

**Your backend code is correct** - it uses `await user.save()` which saves to MongoDB. 

**To verify it's working:**
1. ✅ Use the test script above
2. ✅ Check MongoDB Atlas directly
3. ✅ Check Render logs for errors
4. ✅ Test by refreshing page - data should persist

If data persists after refresh and across devices, **MongoDB is saving correctly!** ✅

