const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/auth.middleware");

const {
  createCategory,
  getCategories,
  deleteCategories,
  editCategories,
} = require("../controller/category.controller");

router.route("/category/create").post(createCategory);

router
  .route("/category/:id")
  .get(getCategories)
  .delete(protect, deleteCategories)
  .patch(protect, editCategories);
module.exports = router;
