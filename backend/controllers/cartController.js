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

        // Calculate total price
        let totalPrice = 0;
        cart.items.forEach(item => {
            totalPrice += item.quantity * item.product.price;
        });

        // Respond with the cart and total price
        res.json({ cart: cart, totalPrice: totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};



// Update the cart (add/remove items, change quantity)
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

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (quantity > 0) {
            if (itemIndex > -1) {
                // Update item quantity
                cart.items[itemIndex].quantity = quantity;
            } else {
                // Add new item to the cart
                cart.items.push({ product: productId, quantity });
            }
        } else if (itemIndex > -1) {
            // Remove item from the cart
            cart.items.splice(itemIndex, 1);
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
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Check stock for each item in the cart
        for (const item of cart.items) {
            if (item.quantity > item.product.stock) {
                return res.status(400).json({ message: `${item.product.name} is out of stock` });
            }
        }

        // Here, add logic to process the payment
        // For example, integrate with a payment gateway API

        // Update the stock for each product
        for (const item of cart.items) {
            const product = await Product.findById(item.product._id);
            product.stock -= item.quantity; // Deduct the quantity from the product's stock
            await product.save();
        }

        // Clear the cart after successful checkout
        cart.items = [];
        await cart.save();

        res.json({ message: 'Checkout successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during checkout', error: error.message });
    }
};
