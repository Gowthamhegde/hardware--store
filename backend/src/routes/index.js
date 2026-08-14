const express = require('express');

const authRoutes = require('./auth.routes');
const usersRoutes = require('./users.routes');
const addressesRoutes = require('./addresses.routes');
const categoriesRoutes = require('./categories.routes');
const productsRoutes = require('./products.routes');
const cartRoutes = require('./cart.routes');
const ordersRoutes = require('./orders.routes');
const paymentsRoutes = require('./payments.routes');
const reviewsRoutes = require('./reviews.routes');
const wishlistRoutes = require('./wishlist.routes');
const adminRoutes = require('./admin.routes');
const searchRoutes = require('./search.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/addresses', addressesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/products', productsRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', ordersRoutes);
router.use('/payments', paymentsRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/admin', adminRoutes);
router.use('/search', searchRoutes);

module.exports = router;
