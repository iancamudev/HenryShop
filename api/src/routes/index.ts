import { Router } from "express";
import postRouter from "./products";
import getRouter from "./products";
const route = Router();

route.post("/", postRouter);
route.get("/", getRouter);

export default route;
