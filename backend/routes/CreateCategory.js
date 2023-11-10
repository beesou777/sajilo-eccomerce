const express = require("express")
const router = express.Router()
const {checkUserIdCookie, checkUser} = require("../middlewares/veryfyToken")
const {createCategory,getCategories, deleteCategories, editCategories} =require("../controller/CreateCategory")
router.route("/create-category").post(checkUser,checkUserIdCookie, createCategory)
router.route("/get-category/:id").get(getCategories)
router.route("/delete-category/:id").delete(checkUserIdCookie,deleteCategories)
router.route("/edit-category/:id").patch(checkUserIdCookie,editCategories)
module.exports = router