const CustomAPIError = require("../errors");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const listProducts = async (req, res, next) => {
  const pageNum = req.query.page || 1;
  const pageSize = req.query.size || 10;
  const sort = req.query.sort || "price";
  const order = req.query.order || "asc";
  try {
    const skip = (pageNum - 1) * pageSize;
    const total = await Product.countDocuments({ removed: false });
    const result = await Product.find({ removed: false })
      .skip(skip)
      .limit(pageSize)
      .sort({ [sort]: order })
      .select("-removed -createdAt");
    res.json({ totalProducts: total, products: result });
  } catch (err) {
    next(err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product(req.body);
    if (!product.name || !product.category || !product.price) {
      throw new CustomAPIError("name, category, price are required", 400);
    }
    await product.save();
    const { createdAt, removed, ...selectedFields } = product._doc;
    res.json(selectedFields);
  } catch (err) {
    err =
      err instanceof mongoose.Error.ValidationError
        ? new CustomAPIError(err.message, 400)
        : err;
    next(err);
  }
};

const getProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product || product.removed) {
      throw new CustomAPIError("Product not found", 404);
    }
    return res.json(product);
  } catch (err) {
    next(err);
  }
};

const updateProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    if (!product || product.removed) {
      throw new CustomAPIError("Product not found", 404);
    }

    let updatedProduct = new Product({ ...product._doc, ...req.body });
    await updatedProduct.validate();
    updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    const { createdAt, removed, ...selectedFields } = updatedProduct._doc;
    res.json(selectedFields);
  } catch (err) {
    err =
      err instanceof mongoose.Error.ValidationError
        ? new CustomAPIError(err.message, 400)
        : err;
    next(err);
  }
};

const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByIdAndUpdate(
      { _id: productId },
      { removed: true },
      { new: true }
    );
    if (!product) {
      throw new CustomAPIError("Product not found", 404);
    }
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
