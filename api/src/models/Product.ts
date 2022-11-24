import { Schema, model, PaginateModel, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { product } from "../Types";

export const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  rating: Number,
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  colors: Array,
  sizes: Array,
  deleted: { type: Boolean, default: false },
  quantity: { type: Number },
  reviews: [{
    text: String,
    rating: Number,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  }],
});

// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

interface ProductDocument extends Document, product { }

productSchema.plugin(mongoosePaginate);

export const Product = model<ProductDocument, PaginateModel<ProductDocument>>(
  "Products",
  productSchema,
  "products"
);

export default Product;