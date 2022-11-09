import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  rating: Number,
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  colors: Array,
  sizes: Array,
  deleted: Boolean,
});
// modifica el _id de lo que te devuelve la base de datos por id, ademas remueve el __v
productSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Product = model("Product", productSchema);
