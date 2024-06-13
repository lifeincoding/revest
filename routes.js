const express = require('express');
const router = express.Router();
const {
  getAllProductsController,
  getProductsByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
  getAllOrdersController,
  getOrdersByIdController,
  createOrdersController,
  updateOrdersController,
  deleteOrdersController,
  createNewSalesOrderController,
  getSalesOrderProductsByIdController,
  getAllSalesOrderProductsController
} = require('./salesOrdersController');

// Products Routes
router.get('/products', getAllProductsController);
router.get('/products/:productId', getProductsByIdController);
router.post('/products', createProductController);
router.put('/products/:productId', updateProductController);
router.delete('/products/:productId', deleteProductController);

// Orders Routes
router.get('/orders', getAllOrdersController);
router.get('/orders/:orderId', getOrdersByIdController);
router.post('/orders', createOrdersController);
router.put('/orders/:orderId', updateOrdersController);
router.delete('/orders/:orderId', deleteOrdersController);

// Sales Orders Routes
router.post('/sales-orders', createNewSalesOrderController);
router.get('/sales-orders/:orderId/products', getSalesOrderProductsByIdController);
router.get('/sales-orders', getAllSalesOrderProductsController);

module.exports = router;
