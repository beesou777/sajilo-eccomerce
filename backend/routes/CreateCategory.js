const express = require("express")
const router = express.Router()
const {checkUserIdCookie} = require("../middlewares/veryfyToken")
const {createCategory,getCategories, deleteCategories, editCategories} =require("../controller/CreateCategory")
router.route("/create-category").post(checkUserIdCookie, createCategory)
router.route("/get-category").get(getCategories)
router.route("/delete-category/:id").delete(checkUserIdCookie,deleteCategories)
router.route("/edit-category/:id").patch(checkUserIdCookie,editCategories)
module.exports = router