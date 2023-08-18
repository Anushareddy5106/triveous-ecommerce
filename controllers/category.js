import Product from "../models/Product.js";

export const getCategory = async (req, res) => {
  try {
    const product = await Product.find();
    let obj = new Set();
    for (let i = 0; i < product.length; i++) {
      //   if (product[i].category === "Clothes") {
      //     obj[product[i].category] = "categoryId => 1";
      //   } else if (product[i].category === "Shoes") {
      //     obj[product[i].category] = "categoryId => 2";
      //   } else if (product[i].category === "Electronics") {
      //     obj[product[i].category] = "categoryId => 3";
      //   } else if (product[i].category === "Appliances") {
      //     obj[product[i].category] = "categoryId => 4";
      //   } else {
      //     obj[product[i].category] = "categoryId => 5";
      //   }
      obj.add(product[i].category);
    }
    res.status(200).send({ categories: Array.from(obj) });
  } catch (err) {
    res.status(500).send({ msg: "something went wrong try again" });
  }
};
