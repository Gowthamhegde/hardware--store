const express = require('express');
const productsController = require('../controllers/products.controller');
const reviewsController = require('../controllers/reviews.controller');
const { validate } = require('../middleware/validate');
const { getProductsQuerySchema } = require('../validations/product.schema');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.get('/', validate(getProductsQuerySchema), productsController.getProducts);
router.get('/:slug', productsController.getProductBySlug);

// Reviews for a specific product
router.get('/:id/reviews', reviewsController.getProductReviews);
router.post('/:id/reviews', authenticate, reviewsController.createReview);

module.exports = router;
