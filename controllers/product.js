import Product from "../models/Product.js";

export const addProduct = async (req, res) => {
  const { title, description, price, availability, category } = req.body;
  const { userId } = req.body;
  // console.log(userId);

  try {
    let categoryId;
    if (category == "Clothes") {
      categoryId = 1;
    } else if (category === "Footwear") {
      categoryId = 2;
    } else if (category === "Electronics") {
      categoryId = 3;
    } else if (category === "Kitchen & Appliances") {
      categoryId = 4;
    } else if (category === "Home Decor") {
      categoryId = 5;
    } else if (category === "Healthcare") {
      categoryId = 6;
    } else if (category === "Groceries") {
      categoryId = 7;
    } else {
      categoryId = 8;
    }

    const product = new Product({
      title,
      description,
      price,
      availability,
      category,
      categoryId,
      userId,
    });

    await product.save();

    return res
      .status(201)
      .send({ message: "Product addedd successfully", product: product });
  } catch (err) {
    res.status(400).send({ message: "Something went wrong" });
  }
};

export const fetchProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    const products = await Product.find({ categoryId });
    if (products.length === 0) {
      return res.status(200).send({ message: "No products in this category" });
    }

    res
      .status(200)
      .send({ message: "Products fetched successfully", products: products });
  } catch (err) {
    res.status(400).send({ message: "Something went wrong" });
  }
};

export const fetchProductById = async (req, res) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);

    res.status(200).send({ product: product });
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
