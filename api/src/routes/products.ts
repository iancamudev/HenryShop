import { Router, Request, Response } from "express";
import {
  getAllProducts,
  // getAllProductsByCategory,
  // getAllProductsByName,
  addNewProduct,
  getProductById
} from "../controllers/product/index";
require("../mongo");

const routes = Router();

//TODOS LOS GET
routes.get("/", async (req: Request, res: Response) => {
  try {
    const category = req.query.category;
    if(category){
      console.log(typeof category);
      // const result = await getAllProductsByCategory(category);
      // if(result.length)res.status(200).send(result);
      // else res.status(201).send({message: "No results find with this category"}) 
    }
    // const name = req.query.name;
    const result = await getAllProducts();
    res.status(200).send(result);
    
  } catch (error:any) {
    res.status(500).json({error_message:error.message});
  }
});

// routes.get("/category/:category", async (req: Request, res: Response) => {
//   try {
//     const {category } = req.params;
//     const result = await getAllProductsByCategory(category);\
//     if(result.length)res.status(200).send(result);
//   } catch (error:any) {
//     res.status(500).json({error_message:error.message});
//   }
// });

// routes.get('/name/:name', async (req:Request, res:Response)=>{
//   try{
//     const {name} = req.params;
//     const result = await getProductsByName(name);
//     if(result.length) res.status(200).send(result);
//     else res.status(201).send({message: "No results find with this name"})
//   }catch(error:any){
//     res.status(500).json({error_message:error.message});
//   }

// });

routes.get("/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    const result = await getProductById(id);

  res.status(200).send(result);
  } catch (error: any) {
    res.status(500).json({error_message:error.message});
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
  } catch (error: any) {
    res.status(500).send({error_message: error.message});
  }
});

//TODOS LOS PUT

export default routes;
