import { Schema, model, PaginateModel, Document } from "mongoose";
import { review } from "../Types";

const reviewSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  product: { type: Schema.Types.ObjectId, ref: 'Products' }
})

reviewSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Review = model('Reviews', reviewSchema)

export default Review;