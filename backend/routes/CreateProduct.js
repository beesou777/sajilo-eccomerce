const express = require("express")
const router = express.Router()
const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct } = require("../controller/CreateProduct")

router.route("/create-product").post(createProduct)
router.route("/get-product").get(getAllProducts)
router.route("/get-product/:id").get(getProductById)
router.route("/delete-product/:id").delete(deleteProduct)
router.route("/edit-product/:id").patch(updateProduct)

module.exports = router