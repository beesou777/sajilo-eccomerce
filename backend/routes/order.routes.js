const express = require("express");
const router = express.Router();

const { protect,isAdmin } = require("../middlewares/auth.middleware");

const {
  getAllOrderItems,
  addOrderItems,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  updateShippingAddress
} = require("../controller/order.controller");

router.route("/order/create").post(protect,addOrderItems);

router.route("/order").get(protect,getAllOrderItems)

router
  .route("/order/:id")
  .get(getOrderById).delete(protect,deleteOrderById)

router.route("/order/shipping/:id").patch(protect,isAdmin,updateShippingAddress)
module.exports = router;
