import { Schema, model } from "mongoose";

const productSchema = new Schema({ 
    name: { type: String, required: true, unique: true },
    rating: Number,
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: {type: String, required: true},
    stock: {type: Number, required: true},
    colors: Array,
    sizes: Array
});


export const Product = model("Product", productSchema);