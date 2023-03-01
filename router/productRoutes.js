const express = require('express');
const router = express.Router();
const prodController = require('../controller/prodController');
const authController = require('../controller/authController');

router
  .route('/')
  .get(authController.protect, prodController.getAllProduct)
  .post(prodController.createProduct);

router
  .route('/:id')
  .get(authController.protect, prodController.getProduct)
  .patch(prodController.updateProduct)
  .delete(prodController.deleteProduct);

module.exports = router;
