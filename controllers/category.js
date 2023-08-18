import Product from "../models/Product.js";

export const getCategory = async (req, res) => {
  try {
    const product = await Product.find();
    let obj = new Set();
    for (let i = 0; i < product.length; i++) {
      obj.add(product[i].category);
    }
    res.status(200).send({ categories: Array.from(obj) });
  } catch (err) {
    res.status(500).send({ msg: "something went wrong try again" });
  }
};
