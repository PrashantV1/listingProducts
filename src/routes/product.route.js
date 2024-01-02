const express = require('express');
const { productController } = require('../controllers');
const {authenticateUser} =require('../middleware/authMiddleWare');

const router = express.Router();



router
  .route('/')
  .get(authenticateUser,productController.getAllProducts);


  router
  .route('/:category')
  .get(authenticateUser,productController.getCategoryProduct);

module.exports = router;
