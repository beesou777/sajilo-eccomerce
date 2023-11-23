const express = require("express");
const router = express.Router();

const {
  createProduct,
  getUsersProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getSubDomainProduct,
} = require("../controller/Products");

const { checkUser, checkUserIdCookie } = require("../middlewares/verifyToken");

router.route("/products/create").post(createProduct);

router.route("/products").get(getUsersProducts);

router.route("/product/owner/:id").get(getSubDomainProduct);

router
  .route("/products/:id")
  .get(getProductById)
  .delete(checkUserIdCookie, deleteProduct)
  .patch(checkUserIdCookie, updateProduct);

module.exports = router;
