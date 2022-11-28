import mongoose, { Schema, model, PaginateModel, Document, SchemaTypes } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { refund, } from "../Types";

export const refundSchema = new Schema({
    product_name: { type: String, required: true },
    customer_email: { type: String, required: true },
    quantity: {type: Number, required: true},
    purchase_id: {type: String, required: true},
    reason: {type: String, required: true},
    buyer_name: {type: String, required: true},
})

refundSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface refundDocument extends Document, refund {}

refundSchema.plugin(mongoosePaginate);

export const Refund = model<refundDocument, PaginateModel<refundDocument>>(
  "Refund",
  refundSchema,
  "refund"
);

export default Refund;