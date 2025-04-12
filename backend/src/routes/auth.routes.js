const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller.js');

// User Sign-In (JWT-based)
router.post('/signin', authController.signIn);
router.post('/refresh', authController.refreshAccessToken);
// User Sign-Up
router.post('/signup', authController.signUp);
router.get('/users', authController.getUser);
router.get('/dashboard/stats', authController.getDashboardStats);
module.exports = router;
