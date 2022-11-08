import { Router } from "express";
import postRouter from "./postRoute"
const route = Router();

route.post("/", postRouter)

export default route;