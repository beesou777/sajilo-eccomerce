const Order = require("../model/OrderModel");

const addOrderItems = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (orderItems && orderItems.length <= 0) {
      res.status(400);
      throw new Error("No order items");
    } else {
      const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user: req.headers.user_id,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getOrderItems = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate();
    if(!order){
        res.status(404).json({message:"order not found please order"})
    }
    res.status(200).json({success:true,order})
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

