import Order from "../models/Order.js";
import Cart from "../models/Cart.js";

export const placeOrder = async (req, res) => {
  const { userId } = req.body;
  const { products } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).send({ message: "Cart is empty" });
    }

    if (!products || products.length === 0) {
      return res
        .status(400)
        .send({ message: "Product ID and a valid quantity are required" });
    }

    let cartItems = [];
    products.map((product) => {
      cartItems.push(
        cart.items.find((item) => item.productId.toString() === product)
      );
    });

    if (!cartItems) {
      return res.status(404).send({ message: "Product not found in the cart" });
    }

    let totalPrice = 0;
    cartItems.map((c) => (totalPrice += c.total));
    // console.log(totalPrice);

    const order = new Order({
      userId,
      items: cartItems,
      totalAmount: totalPrice,
    });

    await order.save();

    products.map((product) => {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== product
      );
    });

    await cart.save();

    res.status(201).send({ message: "Order placed successfully", order });
  } catch (err) {
    res.status(500).send({ err: "Internal server error" });
  }
};

export const getOrderHistory = async (req, res) => {
  const { userId } = req.body;
  try {
    //console.log(userId);

    const orders = await Order.find({ userId }).sort({ createdAt: -1 });

    res
      .status(200)
      .send({ msg: "Your order history fetched Successfully", orders });
  } catch (err) {
    res.status(500).send({ err: "Internal server error" });
  }
};

export const getOrderById = async (req, res) => {
  const { userId, orderId } = req.params;
  try {
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res.status(404).send({ err: "Order not found" });
    }

    res.status(200).send({ msg: "Order details fetched Successfully", order });
  } catch (err) {
    res.status(500).send({ err: "Internal server error" });
  }
};
