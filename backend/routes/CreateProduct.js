const express = require("express")
const router = express.Router()
const { createProduct, getAllProducts, getProductById, deleteProduct, updateProduct, getSubDomainProduct } = require("../controller/CreateProduct")
const {checkUser,checkUserIdCookie} = require("../middlewares/veryfyToken")
router.route("/create-product").post(checkUser,checkUserIdCookie,createProduct)
router.route("/get-product").get(getAllProducts)
router.route("/owner-product/:id").get(getSubDomainProduct)
router.route("/get-product/:id").get(getProductById)
router.route("/delete-product/:id").delete(checkUserIdCookie,deleteProduct)
router.route("/edit-product/:id").patch(checkUserIdCookie,updateProduct)

module.exports = router