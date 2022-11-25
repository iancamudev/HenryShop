import Review from "../../models/Review";
import Product from "../../models/Product";
import User from "../../models/User";
import { product, review, user } from "../../Types";

export const addNewReview = async (text: string, rating: number, user: object, product: object) => {

  if (
    !text ||
    !rating || 
    !user ||
    !product
  ) throw new Error("Flata enviar datos");

  const newReview = await Review.create({ text, rating, user, product })
  console.log('created')
  return newReview;
}