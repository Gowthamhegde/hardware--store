const express = require('express');
const reviewsController = require('../controllers/reviews.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.delete('/:id', authenticate, reviewsController.deleteReview);

module.exports = router;
