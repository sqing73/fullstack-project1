const mongoose = require("mongoose");
const categories = require("../constants/productCategory");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: [...Object.values(categories)],
    required: true,
  },
  image: {
    type: String,
    default:
      "https://www.mooreseal.com/wp-content/uploads/2013/11/dummy-image-square.jpg",
  },
  stock: {
    type: Number,
    min: 0,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  removed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
