// routers/cart.js
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const { authenticationMiddleware } = require('../middlewares/authMiddleware'); // Adjust the path as needed


router.get('/', authenticationMiddleware, CartController.getCart);
router.put('/', authenticationMiddleware, CartController.updateCart);
router.post('/checkout', authenticationMiddleware, CartController.checkout);

module.exports = router;
