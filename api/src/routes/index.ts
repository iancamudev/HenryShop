import { Router } from "express";
import productsRouter from "./products";
import userRouter from "./users";
import userShop from "./Shop"
import categoryRouter from "./categories";
import googleUserRouter from "./googleUsers";
import githubUserRouter from "./githubUsers";
import newsLetterRouter from "./newsletter";

const route = Router();

route.use("/products", productsRouter);
route.use("/users", userRouter);
route.use("/shop", userShop)
route.use("/categories", categoryRouter);
route.use("/googleusers", googleUserRouter);
route.use("/githubusers", githubUserRouter);
route.use("/newsletter", newsLetterRouter);

export default route;
