import { Router, Request, Response } from "express";


import {
  getAllProducts,
  getAllProductsByCategory,
  addNewProduct,
  getProductById,
  deleteProduct,
  changeProperty
} from "../controllers/product/index";
require("../mongo");
const routes = Router();

//TODOS LOS GET
routes.get("/", async (_req: Request, res: Response) => {
  try {
    const result = await getAllProducts();
    res.status(200).send(result);
    
  } catch (error) {
    console.log(error);
  }
});



routes.get("/category/:category", async (req: Request, res: Response) => {
  try {
    const {category }  = req.params;
    const result = await getAllProductsByCategory(category);
    res.status(200).send(result);
   
  } catch (error) {
    console.log(error);
  }
});

routes.get("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
  const result = await getProductById(id);

  res.status(200).send(result);
  } catch (error: any) {
    console.log(error.message);
  }
  
});

//TODOS LOS POSTS
routes.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    if (!newProduct) {
      res.status(400).send({ error: "Info Missing" });
    } else {
      await addNewProduct(newProduct);
      res.status(200).send(newProduct);
    }
  } catch (err: any) {
    res.status(400).send({ message: err.message });
  }
});

//DELETE
routes.delete("/:id", async (req: Request, res: Response) =>{
  try {
    const {id} = req.params;
    const del = await deleteProduct(id);
    res.status(200).send(del);
  } catch (error) {
    console.log(error)
  }
})

//PUT

routes.put("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const bodyr = req.body;
    const put = await changeProperty(id, bodyr)
    res.status(200).send(put)
  } catch (error) {
    console.log(error)
  }
})



export default routes;
