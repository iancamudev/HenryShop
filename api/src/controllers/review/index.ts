import Review from "../../models/Review";
import {review} from "../../Types";

export const addNewReview = async (
  text: string, rating: number, user: object, product: object
) => {
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