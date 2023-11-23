const Order = require("../model/OrderModel");

const addOrderItems = async (req, res) => {
  try {
    const {
      'shippingAddress[address]': address,
      'shippingAddress[city]': city,
      'shippingAddress[tole]': tole,
      'shippingAddress[postalCode]': postalCode,
      'shippingAddress[country]': country,
      paymentMethod,
      totalPrice,
      taxPrice,
      discountPercent,
      finalPrice,
      paidAt,
      deliveredAt,
    } = req.body
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
      if(!address || !city || !tole || !postalCode || !country || !paymentMethod || !totalPrice || ! taxPrice || !discountPercent || !finalPrice){
        return res.status(400).json({message:"all field are required"})
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
        totalPrice,
        discountPercent,
        taxPrice,
        finalPrice,
        paidAt,
        deliveredAt
    })
    await order.save()
    

    return res.status(200).json({ order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
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

module.exports = {
  addOrderItems,
  getOrderItems
}
