import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true,
  },
  category: {
    type: String,
    enum: ["Clothes", "Shoes", "Electronics", "Appliances"],
    default: "Others",
  },
  categoryId: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
  },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
