const express = require('express');
const { authenticateToken } = require('./auth');
const User = require('../models/User');
const Order = require('../models/Order');
const router = express.Router();

// Create new order
router.post('/create', authenticateToken, async (req, res) => {
    try {
        const { items, shippingAddress, subtotal, shipping, total } = req.body;

        if (!items || !shippingAddress || !total) {
            return res.status(400).json({ error: 'Missing required order information' });
        }

        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create order
        const order = new Order({
            userId: req.userId,
            items,
            shippingAddress,
            subtotal: subtotal || total - (shipping || 10),
            shipping: shipping || 10,
            total,
            status: 'pending'
        });

        await order.save();

        // Clear user's cart
        user.cart = [];
        user.orders.push(order._id);
        await user.save();

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
        console.error('Create order error:', error);
        res.status(500).json({ error: 'Server error creating order' });
    }
});

// Get user's orders
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

// Get single order by order number
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

