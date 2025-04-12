const orderService = require('../services/orderService');
// GET /api/orders
// controllers/order.controller.js
exports.getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const result = await orderService.getAllOrders(page, parseInt(limit));
    return res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json({ message: 'Order created', order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};
