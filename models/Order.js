import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      total: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
