const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, orderController.getAllOrders);
router.post('/', auth, orderController.createOrder);

module.exports = router;
