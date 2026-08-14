const express = require('express');
const paymentsController = require('../controllers/payments.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.post('/create-order', authenticate, paymentsController.createRazorpayOrder);
// Webhook should not be authenticated via JWT, it uses razorpay signature
router.post('/webhook', paymentsController.verifyWebhook);

module.exports = router;
