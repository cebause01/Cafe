const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

// Optional authentication middleware - doesn't fail if no token
function optionalAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.userId = null;
        return next();
    }

    const jwt = require('jsonwebtoken');
    const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            req.userId = null;
        } else {
            req.userId = decoded.userId;
        }
        next();
    });
}

// Create new order (works for both logged-in and guest users)
router.post('/create', optionalAuth, async (req, res) => {
    try {
        const { items, shippingAddress, subtotal, shipping, total } = req.body;

        if (!items || !shippingAddress || !total) {
            return res.status(400).json({ error: 'Missing required order information' });
        }

        // Create order
        const order = new Order({
            userId: req.userId || null, // null for guest users
            items,
            shippingAddress,
            subtotal: subtotal || total - (shipping || 10),
            shipping: shipping || 10,
            total,
            status: 'pending'
        });

        await order.save();

        // If logged in, update user's cart and orders
        if (req.userId) {
            const user = await User.findById(req.userId);
            if (user) {
                user.cart = [];
                user.orders.push(order._id);
                await user.save();
            }
        }

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order._id,
                orderNumber: order.orderNumber,
                total: order.total,
                status: order.status,
                createdAt: order.createdAt
            }
        });
    } catch (error) {
        console.error('Create order error:', error.message);
        console.error('Full error:', error);
        res.status(500).json({ error: 'Server error creating order: ' + error.message });
    }
});

// Get logged-in user's orders
router.get('/', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json({ orders });
    } catch (error) {
        console.error('Get orders error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Track order by order number and email (for guests)
router.post('/track', async (req, res) => {
    try {
        const { orderNumber, email } = req.body;

        if (!orderNumber || !email) {
            return res.status(400).json({ error: 'Order number and email are required' });
        }

        const order = await Order.findOne({
            orderNumber: orderNumber,
            'shippingAddress.email': email
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found. Please check your order number and email.' });
        }

        res.json({ order });
    } catch (error) {
        console.error('Track order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Get single order by order number (for logged-in users)
router.get('/:orderNumber', authenticateToken, async (req, res) => {
    try {
        const order = await Order.findOne({
            orderNumber: req.params.orderNumber,
            userId: req.userId
        });

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ order });
    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
