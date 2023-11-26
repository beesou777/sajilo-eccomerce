const express = require("express");
const router = express.Router();

const {
  postProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProductById,
  getSubDomainProduct,
} = require("../controller/product.controller");

const { protect } = require("../middlewares/auth.middleware");

router.route("/product/create").post(protect,postProduct);

router.route("/product").get(protect,getAllProducts);


router.route("/product/owner/:id").get(getSubDomainProduct);

router
  .route("/product/:id")
  .get(protect,getProductById)
  .delete(protect,deleteProduct)
  .patch(protect,updateProductById)
  .put(protect,updateProductById)

module.exports = router;
