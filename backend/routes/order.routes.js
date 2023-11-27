const express = require("express");
const router = express.Router();

const { protect,isAdmin } = require("../middlewares/auth.middleware");

const {
  getAllOrderItems,
  addOrderItems,
  getOrderById,
  deleteOrderById,
  updateShippingAddress,
  orderStatus
} = require("../controller/order.controller");

router.route("/order/create").post(protect,addOrderItems);

router.route("/order").get(protect,getAllOrderItems)

router
  .route("/order/:id")
  .get(getOrderById).delete(protect,isAdmin,deleteOrderById)

router.route("/order/shipping/:id").patch(protect,isAdmin,updateShippingAddress)
router.route("/order/status/:id").patch(protect,isAdmin,orderStatus)
module.exports = router;
