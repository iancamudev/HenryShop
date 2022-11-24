import Review from "../../models/Review";
import { product, review, user } from "../../Types";

export const addNewReview = async (
  text: string, rating: number, userId: object, productId: object
) => {
  if (
    !text ||
    !rating ||
    !productId ||
    !userId
  ) throw new Error("Flata enviar datos");

  const newReview = await Review.create({ text, rating, userId, productId })
  console.log('created')
  return newReview;
}