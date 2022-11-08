import { Router, Request, Response } from "express";
// import mongoose from "mongoose";
import { getAllProducts } from "../controllers/GetController";
require("../mongo");
const routes = Router();

routes.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await getAllProducts();
    res.status(200).send(result);
    //  mongoose.connection.close();
  } catch (error) {
    console.log(error);
  }
});

export default routes;
