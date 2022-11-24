import Review from "../../models/Review";
import Product from "../../models/Product";
import User from "../../models/User";
import { product, review, user } from "../../Types";

export const addNewReview = async (text: string, rating: number, userId: object, productId: object) => {

  if (
    !text ||
    !rating ||
    !productId ||
    !userId
  ) throw new Error("Flata enviar datos");
  const userReview = {
    text,
    rating,
    productId
  }
  const productReview = {
    text,
    rating,
    userId
  }
  await User.findByIdAndUpdate(userId, { '$push': { 'reviews': userReview } })
  await Product.findByIdAndUpdate(productId, { '$push': { 'reviews': productReview } })
  console.log('created')
}