import React from "react";
import { ProductDetails } from "../redux/slices/ProductSlice/";
import { Link } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCart/ContextShoppingCart";
import { Button } from "react-bootstrap";


interface CardProps {
  product: ProductDetails;
}


const ProductCard: React.FC<CardProps> = ({ product }: CardProps) => {
  
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
  
  const { id } = product

  const quantity = getItemQuantity(id);
  

  return (
    <div className="flex flex-col bg-gray-300  ml-10 mr-10 p-10 mt-6 mb-6 delay-75 hover:bg-gray-400 hover:scale-105 hover:duration-300  duration-300 rounded hover:cursor-pointer">
      {product && (
        <>
          <Link to={`/products/${product.id}`}>
            <h5 className="w-64 font-bold mb-4">{product.name}</h5>
          </Link>

      <img className="w-64" src={product.image} alt={`${product.name}_image`} />
          <h6 className="flex items-start font-bold mt-4">
            Talles: {product.sizes ? product.sizes.join(", ") : product.sizes}
          </h6>
          <h6 className="flex items-start">${product.price}</h6>
      
      <div className="d-flex mt-auto">
      { quantity === 0? (
        <Button className="py-2 px-4 rounded w-100 bg-blue-500 text-white" onClick={()=> increaseCartQuantity(product.id)}>+ Agregar a carrito</Button>
      ): (
        <div className="d-flex aling-items-center flex-column" >
          <div className="d-flex aling-items-center justify-content-center" style={{gap: ".5rem"}}>
          <Button className="py-1 px-3 rounded w-100 bg-blue-500 text-white"  onClick={()=> decreaseCartQuantity(product.id)}>-</Button>
          <div>
              <span  className="fs-3">{quantity}</span> en carrito
          </div>
          <Button className="py-1 px-3 rounded w-100 bg-blue-500 text-white"  onClick={()=> increaseCartQuantity(product.id)}>+</Button>
          </div>
         
          <Button className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={()=> removeFromCart(product.id)}>Remover</Button>
        </div>
      )
    }</div>

        </>
      )}
    </div>
  );
};

export default ProductCard;
