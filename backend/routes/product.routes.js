const express = require("express");
const router = express.Router();

const {
  postProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProductById,
  getSubDomainProduct,
  searchProduct,
} = require("../controller/product.controller");

const { protect } = require("../middlewares/auth.middleware");

router.route("/product/create").post(protect,postProduct);

router.route("/product").get(protect,getAllProducts);


router.route("/product/search").get(protect,searchProduct)

router.route("/product/owner/:id").get(getSubDomainProduct);

router
  .route("/product/:id")
  .get(protect,getProductById)
  .delete(protect,deleteProduct)
  .patch(protect,updateProductById)
  .put(protect,updateProductById)

module.exports = router;
