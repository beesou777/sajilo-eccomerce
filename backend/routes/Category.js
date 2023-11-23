const express = require("express");
const router = express.Router();

const { checkUserIdCookie, checkUser } = require("../middlewares/verifyToken");

const {
  createCategory,
  getCategories,
  deleteCategories,
  editCategories,
} = require("../controller/Category");

router.route("/categories").post(checkUser, checkUserIdCookie, createCategory);

router
  .route("/categories/:id")
  .get(getCategories)
  .delete(checkUserIdCookie, deleteCategories)
  .patch(checkUserIdCookie, editCategories);
module.exports = router;
