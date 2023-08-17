import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingCartItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      existingCartItem.total =
        existingCartItem.price * existingCartItem.quantity;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
        title: product.title,
        price: product.price,
        total: product.price,
      });
    }

    await cart.save();

    res
      .status(201)
      .send({ message: "Product added to cart successfully", cart });
  } catch (err) {
    res.status(400).json({ err: "Something went wrong" });
  }
};

export const updateCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId, newQuantity } = req.body;

  try {
    if (!productId || !newQuantity || newQuantity < 0) {
      return res
        .status(400)
        .send({ err: "Product ID and a valid quantity are required" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (cartItemIndex === -1) {
      return res.status(404).send({ err: "Product not found in the cart" });
    }

    cart.items[cartItemIndex].quantity = newQuantity;
    cart.items[cartItemIndex].total =
      cart.items[cartItemIndex].price * cart.items[cartItemIndex].quantity;

    await cart.save();

    res
      .status(200)
      .send({ message: "Cart item updated successfully", cart: cart });
  } catch (err) {
    res.status(400).send({ err: "Something went wrong" });
  }
};

export const removeCartItem = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (cartItemIndex === -1) {
      return res.status(404).send({ message: "Product not found in the cart" });
    }

    cart.items.splice(cartItemIndex, 1);

    await cart.save();

    res
      .status(200)
      .send({ message: "Cart item removed successfully", cart: cart });
  } catch (err) {
    res.status(400).send({ err: "Something went wrong" });
  }
};

export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(404).send({ message: "Cart not found" });
    }

    res.json({ cart });
  } catch (err) {
    res.status(500).send({ err: "Something went wrong" });
  }
};
