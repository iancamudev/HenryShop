import { Router, Request, Response, response } from "express";
import User from "../models/User";
import GoogleUser from "../models/googleUser";
import GithubUser from "../models/githubUser";
import Product from "../models/Product";
import Review from "../models/Review";
import { addNewReview, checkUserReviewOnProduct } from "../controllers/review";
const userValidation = require("../middlewares/userValidation");
const jwt = require("jsonwebtoken");
require("../mongo");

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { text, rating, productId} = req.body;
  try {
    let token = req.get("authorization");
    if (token) {
      token = token.split(" ")[1];
    }
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);
    const userId = decodedToken.id
    await checkUserReviewOnProduct(userId, productId)
    const review = await addNewReview(text, rating, userId, productId); 
    res.status(200).send(review)
  } catch (e: any) {
    console.log(e)
    res.status(500).send({ message: e.message })
  }
});

// get reviews of one product
router.get('/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const product = await Product.findById(productId);
    console.log(product)
    res.status(200).send('Operación concluida')
  } catch (e: any) {
    res.status(500).send({ message: e.message })
  }
})

export default router;
