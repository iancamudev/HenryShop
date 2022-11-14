import { Router } from "express";
import productsRouter from "./products";
import userRouter from "./users";
import fileUpload from "express-fileupload";
const route = Router();


route.use("/products", fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
  }), productsRouter);
route.use("/users", userRouter);

export default route;
