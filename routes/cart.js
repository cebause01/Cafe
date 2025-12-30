const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../models/User');
const router = express.Router();

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ cart: user.cart || [] });
    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add item to cart
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { productId, name, price, quantity = 1, badge, gradient, image } = req.body;

        if (!productId || !name || !price) {
            return res.status(400).json({ error: 'Product ID, name, and price are required' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if item already exists in cart
        const existingItemIndex = user.cart.findIndex(item => item.id === productId);

        if (existingItemIndex > -1) {
            // Update quantity
            user.cart[existingItemIndex].quantity += quantity;
        } else {
            // Add new item
            user.cart.push({
                id: productId,
                name,
                price,
                quantity,
                badge: badge || null,
                gradient: gradient || null,
                image: image || null
            });
        }

        await user.save();
        res.json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Update cart item quantity
router.put('/update', authenticateToken, async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || quantity === undefined) {
            return res.status(400).json({ error: 'Product ID and quantity are required' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const itemIndex = user.cart.findIndex(item => item.id === productId);

        if (itemIndex === -1) {
            return res.status(404).json({ error: 'Item not found in cart' });
        }

        if (quantity <= 0) {
            // Remove item
            user.cart.splice(itemIndex, 1);
        } else {
            // Update quantity
            user.cart[itemIndex].quantity = quantity;
        }

        await user.save();
        res.json({ message: 'Cart updated', cart: user.cart });
    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove item from cart
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.cart = user.cart.filter(item => item.id !== productId);
        await user.save();

        res.json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.cart = [];
        await user.save();

        res.json({ message: 'Cart cleared', cart: [] });
    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

