const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const promotionRoutes = require('./routes/promotion.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();

app.use(cors());
app.use(express.json());
const prefix = process.env.API_PREFIX || '/api/v1';
app.use(`${prefix}/auth`, authRoutes);
app.use(`${prefix}/products`, productRoutes);
app.use(`${prefix}/promotions`, promotionRoutes);
app.use(`${prefix}/orders`, orderRoutes);

module.exports = app;
