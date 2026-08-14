const express = require('express');
const cartController = require('../controllers/cart.controller');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { addToCartSchema, updateCartItemSchema } = require('../validations/cart.schema');

const router = express.Router();

router.use(authenticate);

router.get('/', cartController.getCart);
router.post('/items', validate(addToCartSchema), cartController.addItem);
router.put('/items/:id', validate(updateCartItemSchema), cartController.updateItem);
router.delete('/items/:id', cartController.removeItem);
router.delete('/', cartController.clearCart);

module.exports = router;
