import { Router } from "express";
import productsRouter from "./products";
import userRouter from "./users";

const route = Router();


route.use("/products", productsRouter);
route.use("/users", userRouter);

export default route;
