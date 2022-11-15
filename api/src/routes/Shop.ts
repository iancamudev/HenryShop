import { Router, Request, Response } from "express";
import { addNewShop } from "../controllers/ShopCart";
import { Product } from "../models/Product";
import { Shopping } from "../models/Shopping";
import User from "../models/User";

require("../mongo")
const router = Router();

router.post("/:id", async (req: Request, res: Response)=>{
    const userId = req.params.id;
    const {products} = req.body;  
    const usId = await User.findById(userId)
    const prodId = await Product.find({_id: products})
    try {
            if(usId && prodId){
                console.log("entre");
                const newRela = await addNewShop(usId.id, prodId);
                console.log(newRela); 
                res.status(200).send(newRela);
            }
    } catch (error: any) {
        res.status(400).send({error: error.message})
    }
})

export default router;