const express = require('express');
const router = express.Router();
const {productController,validateProduct} = require('../controllers/product.controller.js');
const auth = require('../middlewares/authMiddleware');

router.get('/', productController.getAllProducts);
router.post('/', auth,validateProduct, productController.createProduct);
router.put('/:id', auth, productController.updateProduct);
router.get('/:id', auth, productController.singleProduct);
router.patch('/:id/enable', auth, productController.toggleProductStatus);

module.exports = router;
