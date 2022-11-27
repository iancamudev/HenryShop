import { Schema, model, PaginateModel, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { product, variant } from "../Types";

export const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  rating: Number,
  description: { type: String, required: true },
  price: { type: Array<Number>, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: Schema.Types.ObjectId, required: true },
  deleted: { type: Boolean, default: false },
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  variantName: String,
  variants: Array<variant>
});

// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface ProductDocument extends Document, product {}

productSchema.plugin(mongoosePaginate);

export const Product = model<ProductDocument, PaginateModel<ProductDocument>>(
  "Products",
  productSchema,
  "products"
);

export default Product;
