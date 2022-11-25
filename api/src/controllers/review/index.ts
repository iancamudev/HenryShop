import Review from "../../models/Review";
import Product from "../../models/Product";
import User from "../../models/User";
import { product, review, user } from "../../Types";

export const addNewReview = async (text: string, rating: number, userId: object, productId: object) => {
  if (
    !text ||
    !rating ||
    !userId ||
    !productId
  ) throw new Error("Flata enviar datos");

  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  const newReview = await Review.create({ text, rating, user: userId, product: productId })

  await User.findByIdAndUpdate(user._id, { reviews: [...user.reviews, { review: newReview.id }] })
  await Product.findByIdAndUpdate(product._id, { reviews: [...product.reviews, { review: newReview.id }] })
  
  console.log('created ', newReview)
  return newReview;
}