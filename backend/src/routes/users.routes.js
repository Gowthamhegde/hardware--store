const express = require('express');
const usersController = require('../controllers/users.controller');
const { authenticate, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.get('/:id', authenticate, usersController.getUser);
router.put('/:id', authenticate, usersController.updateUser);

module.exports = router;
