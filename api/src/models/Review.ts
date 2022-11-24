import mongoose, { Schema, model, PaginateModel, Document, SchemaTypes } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { review } from "../Types";

export const reviewSchema = new Schema({
  text: { type: String, required: true },
  rating: { type: Number, required: true },
  user: {type: SchemaTypes.ObjectId, ref: "User"},
  product: {type: SchemaTypes.ObjectId, ref: "Product"}
})

reviewSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface ReviewDocument extends Document, review {}

reviewSchema.plugin(mongoosePaginate);

export const Review = model<ReviewDocument, PaginateModel<ReviewDocument>>(
  "Review",
  reviewSchema,
  "reviews"
);

export default Review;