import { Product } from "../models/Product";
export const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};
