import { Router } from "express";
import postRouter from "./postRoute";
import getRouter from "./getRoute";
const route = Router();

route.post("/", postRouter);
route.get("/", getRouter);
export default route;
