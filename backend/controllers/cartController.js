const fs = require('fs');
const path = require('path');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Read the coupons file
const couponsFilePath = path.join(__dirname, 'coupons.json'); 
let coupons = [];
try {
  const couponsData = fs.readFileSync(couponsFilePath, 'utf8');
  coupons = JSON.parse(couponsData);
} catch (error) {
  console.error("Failed to load coupons:", error);
}

// Validate Coupon Function
async function validateCoupon(couponCode, totalAmount) {
    const coupon = coupons.find(c => c.code === couponCode);
    if (!coupon) return { valid: false, discountRate: 0.0, message: "Coupon not found" };

    // Check expiration
    if (new Date(coupon.expirationDate) < new Date()) {
        return { valid: false, discountRate: 0.0, message: "Coupon has expired" };
    }

    // Check minimum purchase amount
    if (totalAmount < coupon.minPurchase) {
        return { valid: false, discountRate: 0.0, message: `Minimum purchase of $${coupon.minPurchase} required` };
    }

    return { valid: true, discountRate: coupon.discountRate, message: "Coupon applied successfully" };
}

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

        // Calculate tax
        const taxRate = 0.07;
        let tax = totalPrice * taxRate; // tax is now calculated based on the totalPrice

        // Initialize coupon discount
        let couponDiscount = 0;
        let couponMessage = '';

        // Check if a coupon code is provided
        if (req.query.coupon) {
            const couponValidation = await validateCoupon(req.query.coupon, totalPrice);
            couponMessage = couponValidation.message;
            if (couponValidation.valid) {
                couponDiscount = totalPrice * couponValidation.discountRate;
                totalPrice -= couponDiscount; // Apply discount to total price
            }
        }

        // Add tax to the total price after applying the coupon
        totalPrice += tax;

        // Respond with the cart, total price, tax, coupon discount, and coupon message
        res.json({
            cart: cart,
            totalPrice: totalPrice.toFixed(2), // Convert to a string with 2 decimal places
            tax: tax.toFixed(2),
            couponDiscount: couponDiscount.toFixed(2),
            couponMessage: couponMessage
        });
    } catch (error) {
        // Handle any other errors that may occur
        res.status(500).json({ message: 'Error retrieving cart', error: error.message });
    }
};




// Update the cart (add/remove items, change quantity)
// Update the cart (add/remove items, change quantity)
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

        // Update cart based on the quantity provided
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

        // Populate product details
        cart.populate('items.product').then(async (populatedCart) => {
            // Calculate total price
            let totalPrice = 0;
            populatedCart.items.forEach(item => {
                totalPrice += item.quantity * item.product.price;
            });

            // Calculate tax
            const taxRate = 0.07;
            let tax = totalPrice * taxRate;

            // Initialize coupon discount and message
            let couponDiscount = 0;
            let couponMessage = '';

            // Check if a coupon code is provided
            if (req.query.coupon) {
                const couponValidation = await validateCoupon(req.query.coupon, totalPrice);
                couponMessage = couponValidation.message;
                if (couponValidation.valid) {
                    couponDiscount = totalPrice * couponValidation.discountRate;
                    totalPrice -= couponDiscount; // Apply discount to total price
                }
            }

            // Add tax to the total price after applying the coupon
            totalPrice += tax;

            // Respond with the updated cart and additional details
            res.json({
                message: 'Cart updated successfully',
                cart: populatedCart,
                totalPrice: totalPrice.toFixed(2),
                tax: tax.toFixed(2),
                couponDiscount: couponDiscount.toFixed(2),
                couponMessage: couponMessage
            });
        }).catch(err => {
            res.status(500).json({ message: 'Error populating cart', error: err.message });
        });

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
