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
// Assuming Cart and Product models are already required at the top of your file

// Update the cart (create if not exists, add item)
// Assuming Cart and Product models are already required at the top of your file

// Update the cart (create if not exists, add item)
exports.updateCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        // Validate the product
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        // Find the item in the cart
        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            // Update item quantity if it already exists
            cart.items[itemIndex].quantity += quantity;
        } else {
            // Add new item to the cart
            cart.items.push({ product: productId, quantity: quantity });
        }

        // Save the updated or new cart
        await cart.save();
        res.status(200).json(cart);
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
