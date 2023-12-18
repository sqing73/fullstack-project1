const Cart = require('../models/Cart'); // New Cart model
const Product = require('../models/Product');

// Get the user's cart
exports.getCart = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming user ID is stored in req.user
        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};

// Update the cart (add/remove items, change quantity)
exports.updateCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Find the index of the product in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        // Add or update the item
        if (itemIndex > -1) {
            if (quantity > 0) {
                cart.items[itemIndex].quantity = quantity;
            } else {
                // Remove the item if quantity is 0
                cart.items.splice(itemIndex, 1);
            }
        } else if (quantity > 0) {
            cart.items.push({ product: productId, quantity: quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
};

// Handle the checkout process
exports.checkout = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Logic for the checkout process
        // This could include checking stock, processing payment, etc.

        // After successful checkout, you might want to clear the cart
        cart.items = [];
        await cart.save();

        res.json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during checkout', error: error.message });
    }
};
