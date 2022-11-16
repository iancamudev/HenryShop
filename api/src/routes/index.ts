import { Router } from "express";
import productsRouter from "./products";
import userRouter from "./users";
import fileUpload from "express-fileupload";
import categoryRouter from "./categories";
import googleUserRouter from "./googleUsers";

const route = Router();


route.use("/products", fileUpload({
    useTempFiles : true,
    tempFileDir : './uploads'
  }), productsRouter);
route.use("/users", userRouter);
route.use("/categories", categoryRouter);
route.use("/googleusers", googleUserRouter);

export default route;
