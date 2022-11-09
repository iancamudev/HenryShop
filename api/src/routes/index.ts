import { Router } from "express";
import productsRouter from "./products"

const route = Router();


route.use("/products", productsRouter);

export default route;
