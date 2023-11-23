const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/verifyToken");

const {
  getOrderItems,
  addOrderItems
} = require("../controller/order.controller");

router.route("/order/create").post(addOrderItems);

router
  .route("/order/:id")
  .get(getOrderItems)
module.exports = router;
