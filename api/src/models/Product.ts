import { Schema, model } from "mongoose";

const productSchema = new Schema({ 
    name: { type: String, require: true },
    rating: Number,
    description: { type: String, require: true },   price: { type: Number, require: true },
    image: String,
    stock: Number,
    colors: Array,
    sizes: Array
});


export const Product = model("Product", productSchema);