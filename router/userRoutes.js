const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const prodController = require('../controller/prodController');
const userController = require('../controller/userController');
router.route('/signup').post(authController.signup);
router.route('/login').post(authController.login);
router
  .route('/protect')
  .get(authController.protect, prodController.getAllProduct);
router.route('/').get(authController.protect, userController.getAllUser);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.updateUser);

module.exports = router;
