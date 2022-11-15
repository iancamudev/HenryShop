import { Router } from "express";
import productsRouter from "./products";
import userRouter from "./users";
import fileUpload from "express-fileupload";
import categoryRouter from "./categories";
const route = Router();


route.use("/products", fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
  }), productsRouter);
route.use("/users", userRouter);

route.use("/categories", categoryRouter);

export default route;
