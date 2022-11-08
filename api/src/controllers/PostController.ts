import { product } from "../Types";
import { Product } from "../models/Product";
// import mongoose from "mongoose";

export const addNewProduct = async (prod: product) => {
  if (
    !prod ||
    !prod.name ||
    !prod.description ||
    !prod.stock ||
    !prod.price ||
    !prod.category
  ) {
    throw new Error("Info Missing");
  }
  const productFind = await Product.findOne({ name: prod.name });
  if (!productFind) {
    const newProduct = new Product({
      name: prod.name,
      description: prod.description,
      price: prod.price,
      rating: prod.rating,
      image: prod.image,
      stock: prod.stock,
      category: prod.category,
      colors: prod.colors,
      sizes: prod.sizes,
    });
    newProduct
      .save()
      .then((result) => {
        //        mongoose.connection.close();
        return result;
      })
      .catch((error) => new Error(error));
  } else {
    throw new Error("Product already exist");
  }
};
