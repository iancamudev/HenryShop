import Review from "../../models/Review";
import Product from "../../models/Product";
import User from "../../models/User";
import { product, review, user } from "../../Types";
import { getProductById } from '../product'
import { getUserById } from "../user";
import { removeAllListeners } from "process";


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

  return newReview;
}

export const checkUserReviewOnProduct = async (userId: string, productId: string) => {
  const product = await getProductById(productId);
  const user = await getUserById(userId);
  if(!user || !product) throw new Error('Wrong product or user');
  product.reviews.forEach((rev: any) => {
    if(rev.review.user._id.toString() == userId)
      throw new Error('Este usuario ya ha hecho una reseña en este producto')
  })
}

export const updateReview = async (reviewId: string, text: string, rating: number) => {
  const review = await Review.findByIdAndUpdate(reviewId, {
    rating,
    text
  })
  if(!review) throw new Error('Review no encontrada')
  return review;
}