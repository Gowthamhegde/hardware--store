const express = require('express');
const ordersController = require('../controllers/orders.controller');
const { authenticate } = require('../middleware/auth');
const { validate } = require('../middleware/validate');
const { checkoutSchema } = require('../validations/order.schema');

const router = express.Router();

router.use(authenticate);

router.post('/', validate(checkoutSchema), ordersController.createOrder);
router.get('/', ordersController.getOrders);
router.get('/:id', ordersController.getOrderById);
router.put('/:id/cancel', ordersController.cancelOrder);

module.exports = router;
