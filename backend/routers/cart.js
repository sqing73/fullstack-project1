// routers/cart.js
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, CartController.getCart);
router.put('/', authMiddleware, CartController.updateCart);
router.post('/checkout', authMiddleware, CartController.checkout);

module.exports = router;
