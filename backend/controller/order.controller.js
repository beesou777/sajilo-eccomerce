const Order = require("../model/order.models");
const Product = require("../model/product.model");
const User = require("../model/user.model");
const Customer = require("../model/customer.model");
const addOrderItems = async (req, res, next) => {
  try {
    const {
      orderItems,
      customer_details: { address, city, tole, country, name, email, phone },
      discount_percent,
    } = req.body;

    const sub_domain = req.headers?.url?.trim().split("/")[1];

    let total_price = 0;

    for (const data of orderItems) {
      const productId = data.product;
      const products = await Product.find({ _id: productId });

      total_price += products.reduce((acc, product) => {
        return acc + product.selling_price * parseInt(data.quantity);
      }, 0);
    }

    if (!address || !city || !tole || !country) {
      res.status(400);
      return next({ message: "all field are required" });
    }

    let new_final_price;
    let new_discount_amount;

    if (discount_percent) {
      new_discount_amount = (discount_percent / 100) * total_price;
      new_final_price =
        total_price + (13 / 100) * total_price - new_discount_amount;
    } else {
      new_final_price = total_price + (13 / 100) * total_price;
    }

    let user_id;
    if (sub_domain) {
      const user = await User.findOne({ sub_domain });
      if (user) {
        user_id = user.id.valueOf();
      }
    } else {
      user_id = req.headers.user_id;
    }
    const findCustomer = await Customer.findOne({ user: user_id });
    if (sub_domain) {
      const order = new Order({
        user: user_id,
        orderItems,
        customer_details: {
          address,
          city,
          tole,
          name:findCustomer.first_name+ " " +findCustomer.last_name,
          country,
          email:findCustomer.email,
          phone:findCustomer.phone_number,
        },
        payment_method: "COD",
        total_price: total_price,
        discount_amount: new_discount_amount,
        tax_price: (13 / 100) * total_price,
        final_price: new_final_price,
        order_status: "Pending",
        payment_status: "Unpaid",
      });
      await order.save();
      return res.status(200).json({ success: true, order });
    } else {
      const order = new Order({
        user: user_id,
        orderItems,
        customer_details: {
          address,
          city,
          tole,
          name,
          country,
          email,
          phone,
        },
        payment_method: "COD",
        total_price: total_price,
        discount_amount: new_discount_amount,
        tax_price: (13 / 100) * total_price,
        final_price: new_final_price,
        order_status: "Pending",
        payment_status: "Unpaid",
      });
      await order.save();
      return res.status(200).json({ success: true, order });
    }

  } catch (error) {
    console.error(error);
    next({ message: "Internal server error" });
  }
};

const getAllOrderItems = async (req, res, next) => {
  try {
    const id = req.headers.user_id;
    const keyword = req.query.search
      ? {
          $or: [
            {
              "customer_details.email": {
                $regex: req.query.search.trim(),
                $options: "i",
              },
            },
            {
              "customer_details.name": {
                $regex: req.query.search.trim(),
                $options: "i",
              },
            },
          ],
        }
      : {};
    const order = await Order.find({ user: id, ...keyword })
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
      res.status(404);
      return next({ message: "order not found please order" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    next({ message: "internal server error" });
  }
};

const getOrderById = async (req, res, next) => {
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
      res.status(404);
      return next({ message: "order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    next({
      message: "Internal server error",
    });
  }
};

const updateShippingAddress = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { address, city, tole, name, country, email, phone } = req.body;
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      {
        customer_details: {
          address,
          city,
          tole,
          name,
          country,
          email,
          phone,
        },
      },
      { new: true }
    )
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
    res.status(200).json({ success: true, order });
  } catch (error) {
    next({
      message: "internal server error",
    });
  }
};

const deleteOrderById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteOrder = await Order.findOneAndDelete({ _id: id });
    if (!deleteOrder) {
      res.status(400);
      return next({ message: "some error occur while deleting order" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    next({
      message: "Internal Server error",
    });
  }
};

const orderStatus = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { order_status, payment_status } = req.body;
    console.log(req.body);
    if (!order_status || !payment_status) {
      res.status(400);
      return next({
        message: "all are required",
      });
    }
    const order = await Order.findByIdAndUpdate(
      { _id: id },
      { order_status, payment_status },
      { new: true }
    )
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
    res.status(200).json({ message: "successfully updated", order });
  } catch (error) {
    next({
      message: "Internal server error",
    });
  }
};
module.exports = {
  addOrderItems,
  getAllOrderItems,
  getOrderById,
  deleteOrderById,
  updateShippingAddress,
  orderStatus,
};
