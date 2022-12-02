//routes/index.js

const express = require('express');
const router = express.Router();
const IndexController = require('../controllers/IndexController');
const ProductController = require('../controllers/ProductController');
const CategoryController = require('../controllers/CategoryController');
const OrderController = require('../controllers/OrderController');
const OrderStatusController = require('../controllers/OrderStatusController');

// defined responses for home page
router.get('/', IndexController.home);

// defined responses for products
router.get('/api/products', ProductController.getAll);
router.get('/api/products/:id', ProductController.getById);
router.post('/api/products', ProductController.store);
router.put('/api/products', ProductController.updateById);

// defined responses for categories
router.get('/api/categories', CategoryController.getAll);

// defined responses for orders
router.get('/api/orders', OrderController.getAll);
router.post('/api/orders', OrderController.store);
router.put('/api/orders/:id/:stan', OrderController.updateStatusById);
router.get('/api/orders/:status', OrderController.getOrders);


// defined response for order statuses
router.get('/api/status', OrderStatusController.getAll);


module.exports = router;
