import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import {
  getAllProducts,
  getAllProductsByCategory,
} from "../controllers/product/GetController";
import { addNewProduct } from "../controllers/product/PostController";
require("../mongo");
const routes = Router();

//TODOS LOS GET
routes.get("/products", async (_req: Request, res: Response) => {
  try {
    const result = await getAllProducts();
    res.status(200).send(result);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
});

routes.get("/products/:category", async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const result = await getAllProductsByCategory(category);
    res.status(200).send(result);
    mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
});

//TODOS LOS POSTS
routes.post("/products", async (req, res) => {
  const newProduct = req.body;
  try {
    if (!newProduct) {
      res.status(400).send({ error: "Info Missing" });
    } else {
      await addNewProduct(newProduct);
      res.status(200).send(newProduct);
    }
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});
export default routes;
