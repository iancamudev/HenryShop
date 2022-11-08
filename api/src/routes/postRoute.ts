import {Router} from "express";
import { Product } from "../models/Product";
import { addNewProduct } from "../controllers/PostController";

require("../mongo")
const rout = Router();

rout.post("/", async (req, res) => {
    const newProduct = req.body
    const findProduct = await Product.findOne({name: newProduct.name})
    if(findProduct){
      res.status(400).send({error: "Product already exist"})
    }
    if(!newProduct){
      res.status(400).send({error: "Info Missing"})
    }
    try {
      if(newProduct){
        addNewProduct(newProduct);
        res.status(200).send(newProduct);
      }
    } catch (error) {
      res.status(400).send({message: error})
    }
});

export default rout;