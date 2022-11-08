import { product } from "../Types";
import { Product } from "../models/Product";
import mongoose from "mongoose";

export const addNewProduct = (prod: product)=>{
    if(!prod){
        throw new Error("Info Missing");
    }
    const newProduct = new Product({
        name: prod.name,
        description: prod.description,
        price: prod.price,
        rating: prod.rating,
        image: prod.image,
        stock: prod.stock,
        colors: prod.colors,
        sizes: prod.sizes
    })
    newProduct.save().then(result => {
        mongoose.connection.close();
        return result;
    })

    return newProduct;
}