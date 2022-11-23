import { Router, Request, Response } from "express";
import { addNewShop, getAllShopAdmin } from "../controllers/ShopCart";
import { Product } from "../models/Product";
import { Shopping } from "../models/Shopping";
import User from "../models/User";
const jwt = require("jsonwebtoken");
import { GoogleUser } from "../models/googleUser";
import { GithubUser } from "../models/githubUser";


require("../mongo")
const router = Router();

router.post("/", async (req: Request, res: Response)=>{
    const userId = req.params.id;
    const {products} = req.body;  

    let token = req.get("authorization");
    if (token) {
      token = token.split(" ")[1];
    }
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    let user = null;
    if (decodedToken) {
      user = await User.findOne({ _id: decodedToken.id });
    }
    if(!user){
      user = await GoogleUser.findOne({ email: decodedToken.email });
    }
    if(!user){
      user = await GithubUser.findOne({ username: decodedToken.username });
    }

    const prodId = await Product.find({_id: products})
    try {
            if(user && prodId){
                const newRela = await addNewShop(user.id, prodId);
                console.log(newRela); 
                res.status(200).send(newRela);
            }
    } catch (error: any) {
        res.status(400).send({error: error.message})
    }
})
router.get("/adminusers",  async (req: Request, res: Response)=> {
  try {
    const { page } = req.query
    var result;
    var y: number;
    page ? y = +page : y = 0; 
    page ? result = await getAllShopAdmin(y) : result = await getAllShopAdmin(1);
    res.send(result)
  } catch (error) {
    res.status(400).send(error)
  }
})

export default router;
