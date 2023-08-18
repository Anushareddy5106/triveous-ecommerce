import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import cartRoutes from "./routes/cart.js";
import orderRoutes from "./routes/order.js";
import categoryRoutes from "./routes/category.js";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.get("/",(req,res)=>{
    res.send("Triveous E-commerce Backend Server")
})
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// console.log(process.env);
const PORT = process.env.PORT || 5000;

//connecting database
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((err) => console.log(err.message));

app.use("/", userRoutes);
app.use("/products", productRoutes);
app.use("/categoryList", categoryRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
