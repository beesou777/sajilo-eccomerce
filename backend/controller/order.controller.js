const Order = require("../model/order.models");
const Product = require("../model/product.model");
const addOrderItems = async (req, res) => {
  try {
    const {
      "shippingAddress[address]": address,
      "shippingAddress[city]": city,
      "shippingAddress[tole]": tole,
      "shippingAddress[postalCode]": postalCode,
      "shippingAddress[country]": country,
      paymentMethod,
      discountPercent,
      deliver_status,
      deliveredAt,
    } = req.body;

    const order_items = Object.keys(req.body)
      .filter((key) => key.startsWith("orderItems["))
      .reduce((acc, key) => {
        const match = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (match) {
          const index = match[1];
          const field = match[2];

          if (!acc[index]) {
            acc[index] = {};
          }

          acc[index][field] = req.body[key];
        }
        return acc;
      }, []);

      let total_price = 0;

      for (const data of order_items) {
        const productId = data.product;
        const products = await Product.find({ _id: productId });

       total_price += products.reduce((acc,product)=>{
          return acc + product.selling_price * parseInt(data.quantity)
        },0)
        
      }
    if (
      !address ||
      !city ||
      !tole ||
      !postalCode ||
      !country ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "all field are required" });
    }

    let final_price;
    let discount_amount;

    if(discountPercent){
      discount_amount =(discountPercent/100)*total_price
      final_price = total_price + (13/100) * total_price - discount_amount
    }else{
      final_price =  total_price + (13/100) * total_price
    }


    const order = new Order({
      user:req.headers.user_id,
      orderItems:order_items,
        shippingAddress:{
          address,
          city,
          tole,
          postalCode,
          country
        },
        paymentMethod,
        totalPrice:total_price,
        discountPercent:discount_amount,
        taxPrice:(13/100)*total_price,
        finalPrice:final_price,
        deliver_status,
        deliveredAt
    })
    await order.save()

    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllOrderItems = async (req, res) => {
  try {
    const id = req.headers.user_id;
    const order = await Order.find({ user: id })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "orderItems.product",
        select: "-user",
        populate: {
          path: "product_category",
          select: "-user",
        },
      });
    if (!order) {
      res.status(404).json({ message: "order not found please order" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findById({ _id: id })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate({
        path: "orderItems.product",
        select: "-user",
        populate: {
          path: "product_category",
          select: "-user",
        },
      });
    if (!order) {
      return res.status(404).json({ message: "order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      "shippingAddress[address]": address,
      "shippingAddress[city]": city,
      "shippingAddress[tole]": tole,
      "shippingAddress[postalCode]": postalCode,
      "shippingAddress[country]": country,
      paymentMethod,
      totalPrice,
      taxPrice,
      discountPercent,
      finalPrice,
      paidAt,
      deliveredAt,
    } = req.body;
    const order_items = Object.keys(req.body)
      .filter((key) => key.startsWith("orderItems["))
      .reduce((acc, key) => {
        const match = key.match(/\[(\d+)\]\[(\w+)\]/);
        if (match) {
          const index = match[1];
          const field = match[2];

          if (!acc[index]) {
            acc[index] = {};
          }

          acc[index][field] = req.body[key];
        }
        return acc;
      }, []);
    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        orderItems: order_items,
        shippingAddress: {
          address,
          city,
          tole,
          postalCode,
          country,
        },
        paymentMethod,
        totalPrice,
        discountPercent,
        taxPrice,
        finalPrice,
        paidAt,
        deliveredAt,
      },
      { new: true }
    );
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateShippingAddress = async (req, res) => {
  try {
    const id = req.params.id;
    const { address, city, tole, postalCode, country } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: id },
      {
        shippingAddress: {
          address,
          city,
          tole,
          postalCode,
          country,
        },
      },
      { new: true }
    );
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteOrder = await Order.findOneAndDelete({ _id: id });
    if (!deleteOrder) {
      return res
        .status(400)
        .json({ message: "some error occur while deleting order" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json("internal server error");
  }
};

module.exports = {
  addOrderItems,
  getAllOrderItems,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  updateShippingAddress,
};
