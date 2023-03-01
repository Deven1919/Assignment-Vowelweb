const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const authController = require('../controller/authController');

router
  .route('/')
  .get(authController.protect, orderController.AllOrder)
  .post(orderController.createOrder);
router.route('/:id').get(authController.protect, orderController.getOrder);

module.exports = router;
