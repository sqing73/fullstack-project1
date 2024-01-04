const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart"); // Add this line to import the Cart model
const CustomAPIError = require("../errors");
const path = require("path");
const {
  authenticationMiddleware: auth,
  authorizationMiddleware: admin,
} = require("../middlewares/auth");
const router = express.Router();

const envFilePath = path.resolve(__dirname, "../.env");
require("dotenv").config({ path: envFilePath });

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new CustomAPIError("Email or password missing", 400);
    }
    let user = await User.findOne({ email });
    if (!user) {
      throw new CustomAPIError("Email not found", 400);
    }
    if (user.password !== password) {
      throw new CustomAPIError("Password not right", 400);
    }
    const jwtPayload = {
      user: {
        id: user._id,
      },
    };
    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Retrieve user's shopping cart
    const cart = await Cart.findOne({ user: user._id }).populate(
      "items.product"
    );
    let cartDetails = null;
    if (cart) {
      let totalPrice = 0;
      cart.items.forEach((item) => {
        totalPrice += item.quantity * item.product.price;
      });
      const taxRate = 0.07;
      let tax = totalPrice * taxRate; // tax is now calculated based on the totalPrice
      totalPrice += tax;

      cartDetails = {
        cart: cart,
        totalPrice: totalPrice.toFixed(2), // Convert to a string with 2 decimal places
        tax: tax.toFixed(2),
      };
    }

    // remove the user from black list
    // or authentication middleware might block the user
    req.app.locals.blackList.delete(user._id.toString());
    console.log("after login: ", req.app.locals.blackList);

    // Send the JWT token and cart details in the response
    res.json({ token: jwtToken, role: user.role, cart: cartDetails });
  } catch (err) {
    next(err);
  }
});

router.delete("/logout", auth, async (req, res, next) => {
  req.app.locals.blackList.add(req.user.id);
  console.log("after logout: ", req.app.locals.blackList);
  res.sendStatus(200);
});

module.exports = router;
