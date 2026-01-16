const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../models/User');
const router = express.Router();

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ wishlist: user.wishlist || [] });
    } catch (error) {
        console.error('Get wishlist error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Add item to wishlist
router.post('/add', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if already in wishlist
        if (!user.wishlist.includes(productId)) {
            user.wishlist.push(productId);
            await user.save();
        }

        res.json({ message: 'Item added to wishlist', wishlist: user.wishlist });
    } catch (error) {
        console.error('Add to wishlist error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Remove item from wishlist
router.delete('/remove/:productId', authenticateToken, async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.wishlist = user.wishlist.filter(id => id !== productId);
        await user.save();

        res.json({ message: 'Item removed from wishlist', wishlist: user.wishlist });
    } catch (error) {
        console.error('Remove from wishlist error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Toggle wishlist item
router.post('/toggle', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const index = user.wishlist.indexOf(productId);
        if (index > -1) {
            user.wishlist.splice(index, 1);
            await user.save();
            res.json({ message: 'Item removed from wishlist', wishlist: user.wishlist, added: false });
        } else {
            user.wishlist.push(productId);
            await user.save();
            res.json({ message: 'Item added to wishlist', wishlist: user.wishlist, added: true });
        }
    } catch (error) {
        console.error('Toggle wishlist error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

