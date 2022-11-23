import { Router, Request, Response, response } from "express";
import User from "../models/User";
import GoogleUser from "../models/googleUser";
import GithubUser from "../models/githubUser";
import Product from "../models/Product";
import Review from "../models/Review";
const userValidation = require("../middlewares/userValidation");
require("../mongo");

const router = Router();

router.post('/', userValidation, async (req: Request, res: Response) => {
  const { userId, productId, text, rating } = req.body;
  try {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    const review = new Review({
      text,
      rating,
      user: userId,
      product: productId,
    });
    await review.save()
    user.reviews = [...user.reviews, review._id]
    await user.save()
    product.reviews = [...product.reviews, review._id]
    await product.save()
    res.status(200).send(review)
  } catch (e: any) {
    res.status(500).send({ message: e.message })
  }
});

// get a specific review
router.get('/getreview/:reviewId', async (req: Request, res: Response) => {
  const { reviewId } = req.params;
  try {
    const review = await Product.findById(reviewId);
    console.log(review)
    review.populate('user');
    review.populate('product');
    res.status(200).send('Review ')
  } catch (e: any) {
    res.status(500).send({ message: e.message })
  }
})

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
