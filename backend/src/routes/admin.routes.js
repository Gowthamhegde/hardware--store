const express = require('express');
const adminController = require('../controllers/admin.controller');
const usersController = require('../controllers/users.controller');
const categoriesController = require('../controllers/categories.controller');
const productsController = require('../controllers/products.controller');
const ordersController = require('../controllers/orders.controller');

const { authenticate, restrictTo } = require('../middleware/auth');
const upload = require('../middleware/upload');
const { validate } = require('../middleware/validate');
const { createProductSchema, updateProductSchema, getAdminOrdersQuerySchema } = require('../validations/product.schema'); // Note: some schemas reused or moved, we'll keep it simple
const { updateOrderStatusSchema } = require('../validations/order.schema');

const router = express.Router();

// All admin routes are protected
router.use(authenticate, restrictTo('admin'));

// Stats & Inventory
router.get('/stats', adminController.getDashboardStats);
router.get('/inventory', adminController.getInventory);

// Users
router.get('/users', usersController.getAdminUsers);
router.delete('/users/:id', usersController.deleteAdminUser);

// Categories
router.post('/categories', categoriesController.createCategory);
router.put('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

// Products
router.post('/products', upload.array('images', 5), validate(createProductSchema), productsController.createProduct);
router.put('/products/:id', validate(updateProductSchema), productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);
router.post('/products/:id/images', upload.array('images', 5), productsController.addProductImages);
router.delete('/products/:id/images/:imageId', productsController.deleteProductImage);

// Orders
router.get('/orders', validate(getAdminOrdersQuerySchema), ordersController.getAdminOrders);
router.put('/orders/:id/status', validate(updateOrderStatusSchema), ordersController.updateOrderStatus);

module.exports = router;
