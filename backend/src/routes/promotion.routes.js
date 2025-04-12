const express = require('express');
const router = express.Router();
const promotionController = require('../controllers/promotion.controller');
const auth = require('../middlewares/authMiddleware');

router.get('/', promotionController.getAllPromotions);
router.post('/', auth, promotionController.promotionValidate, promotionController.createPromotion);
router.put('/:id', auth, promotionController.updatePromotion);
router.patch('/:id/enable', auth, promotionController.togglePromotionStatus);

module.exports = router;
