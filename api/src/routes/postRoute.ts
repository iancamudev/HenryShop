import {Router} from "express";
import { addNewProduct } from "../controllers/PostController";



require("../mongo")
const rout = Router();

rout.post("/", async (req, res) => {
    const newProduct = req.body
    try {
      if(!newProduct){
        res.status(400).send({error: "Info Missing"})
      }else{
        await addNewProduct(newProduct);
        res.status(200).send(newProduct)
    }
    } catch (err: any) {
      res.status(400).send({message: err.message})
    }
    
});

export default rout;