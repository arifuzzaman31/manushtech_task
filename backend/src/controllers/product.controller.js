const prisma = require('../config/db.js');
const productService = require('../services/productService.js');
const { validationResult, body } = require('express-validator');

const validateProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('weight').isFloat({ min: 0 }).withMessage('Weight must be a positive number'),
  body('enabled').optional().isBoolean().withMessage('Enabled must be a boolean'),
];
const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productService.getAllProducts(req)
      return res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  createProduct: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
    try {
      const { name, description, price, weight, enabled } = req.body;
      const createdProduct = await productService.createProduct({
        name,
        description,
        price,
        weight,
        enabled,
      });
      res.status(201).json({ message: 'Product created', product: createdProduct });
    } catch (error) {
      console.error('Error creating product:', error);
      if (error.code === 'P2002') {
        res.status(409).json({ error: 'Product already exists' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },

  updateProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const { name, description, price, weight, enabled } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: {
          name,
          description,
          price,
          weight,
          enabled: enabled !== undefined ? enabled : undefined,
        },
      });
      res.json(updatedProduct);
    } catch (error) {
      console.error('Error updating product:', error);
      if (error.code === 'P2025') {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  },
  
  singleProduct: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) }
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      return res.json(product);
    } catch (error) {
      console.error('Error toggling product status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  toggleProductStatus: async (req, res) => {
    const { id } = req.params;
    try {
      const product = await prisma.product.findUnique({
        where: { id: parseInt(id) },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const updatedProduct = await prisma.product.update({
        where: { id: parseInt(id) },
        data: { enabled: !product.enabled },
      });

      res.json(updatedProduct);
    } catch (error) {
      console.error('Error toggling product status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = { productController, validateProduct };