const express = require('express');
const addressesController = require('../controllers/addresses.controller');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', addressesController.getAddresses);
router.post('/', addressesController.createAddress);
router.put('/:id', addressesController.updateAddress);
router.delete('/:id', addressesController.deleteAddress);

module.exports = router;
