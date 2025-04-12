// payload body {
//     "title": "Weight Based Summer Discount",
//     "type": "weighted",
//     "startDate": "2025-04-01",
//     "endDate": "2025-06-30",
//     "slabs": [
//       { "minWeight": 1, "maxWeight": 5.5, "discount": 2 },
//       { "minWeight": 6, "maxWeight": 8.5, "discount": 3 },
//       { "minWeight": 9, "maxWeight": 11.5, "discount": 4 },
//       { "minWeight": 12, "maxWeight": null, "discount": 5 }
//     ]
//   }
  
const promotionService = require('../services/promotionService');
const { validationResult, body } = require('express-validator');

// Validation middleware
const promotionValidate = [
  body('title').notEmpty().withMessage('Title is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('endDate').notEmpty().withMessage('End date is required'),
  body('slabs').isArray({ min: 1 }).withMessage('Slabs must be an array with at least 1 element'),
  body('slabs.*.minWeight').isFloat({ min: 0 }).withMessage('Min weight must be a positive number'),
  body('slabs.*.maxWeight').optional({ nullable: true }).isFloat({ min: 0 }).withMessage('Max weight must be a positive number'),
  body('slabs.*.discount').isFloat({ min: 0 }).withMessage('Discount must be a positive number'),
];

const getAllPromotions = async (req, res) => {
  try {
    const promotions = await promotionService.getAllPromotions();
    res.json(promotions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch promotions' });
  }
};

// POST /api/promotions
const createPromotion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { title, type, startDate, endDate, slabs } = req.body;
    const promotion = await promotionService.createPromotion({
      title,
      type,
      startDate,
      endDate,
      slabs,
    });

    res.status(201).json({ message: 'Promotion created', promotion });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create promotion' });
  }
};

// PUT /api/promotions/:id
const updatePromotion = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  try {
    const { id } = req.params;
    const { title, startDate, endDate } = req.body;

    const updated = await promotionService.updatePromotion(id, {
      title,
      startDate,
      endDate,
    });

    res.json({ message: 'Promotion updated', promotion: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update promotion' });
  }
};

// PATCH /api/promotions/:id/enable
const togglePromotionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const toggled = await promotionService.togglePromotionStatus(parseInt(id));
    return res.json({ message: 'Promotion status toggled', promotion: toggled });
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

module.exports = {
  getAllPromotions,
  createPromotion,
  updatePromotion,
  togglePromotionStatus,
  promotionValidate,
};