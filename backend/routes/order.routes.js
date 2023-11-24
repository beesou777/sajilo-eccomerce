const express = require("express");
const router = express.Router();

const { protect } = require("../middlewares/verifyToken");

const {
  getAllOrderItems,
  addOrderItems,
  getOrderById,
  updateOrderById,
  deleteOrderById
} = require("../controller/order.controller");

router.route("/order/create").post(protect,addOrderItems);

router.route("/order").get(protect,getAllOrderItems)

router
  .route("/order/:id")
  .get(getOrderById).put(protect,updateOrderById).delete(protect,deleteOrderById)
module.exports = router;
