import { product } from "../../Types";
import { Product } from "../../models/Product";


export const getAllProductsAdmin = async () => {
  const result = await Product.find();
  return result;
};

export const getAllProducts = async () => {
  const result = await Product.find({deleted: false});
  return result;
};

export const getAllProductsByCategory = async (category: String) => {
  const result = await Product.find({ category: category });
  return result;
};

export const getProductById = async (id: String) => {
 const result = await Product.findById(id);

  if(!result){
    throw new Error("No se encontro el producto con ese id");
  }
 
 return result;
};


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
      deleted: false,
    });
    newProduct
      .save()
      .then((result) => {
        
        return result;
      })
      .catch((error) => new Error(error));
  } else {
    throw new Error("Product already exist");
  }
};

export const deleteProduct = async (id: String) => {
  const result = await Product.findOneAndUpdate({_id : id}, {deleted : true});
 
   if(!result){
     throw new Error("No se puede eliminar el producto");
   }
  
  return result;
 };

export const changeProperty = async (id: String, body: Object) => {
  const result = await Product.updateOne({id: id, $set: {body}});
  if(!result){
    throw new Error("No existe el producto");
  }
  return result;
}