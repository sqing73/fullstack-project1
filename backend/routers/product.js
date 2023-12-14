const express = require("express");
const {
  listProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
} = require("../controllers/product");
const {
  authenticationMiddleware: auth,
  authorizationMiddleware: admin,
} = require("../middlewares/auth");
const router = express.Router();

router.get("/", listProducts);
router.post("/", auth, admin, createProduct);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.delete("/:id", auth, admin, deleteProduct);

module.exports = router;
