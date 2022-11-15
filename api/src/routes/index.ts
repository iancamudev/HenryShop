import { Router } from "express";
import productsRouter from "./products";
import userRouter from "./users";
import fileUpload from "express-fileupload";
import userShop from "./Shop"

const route = Router();


route.use("/products", fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
  }), productsRouter);
route.use("/users", userRouter);
route.use("/shop", userShop)
export default route;
