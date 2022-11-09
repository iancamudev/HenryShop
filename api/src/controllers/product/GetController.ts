import { Product } from "../../models/Product";
export const getAllProducts = async () => {
  const result = await Product.find();
  return result;
};

export const getAllProductsByCategory = async (category: String) => {
  const result = await Product.find({ category: category });
  return result;
};
