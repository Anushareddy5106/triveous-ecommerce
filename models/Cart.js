import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, default: 1 },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
