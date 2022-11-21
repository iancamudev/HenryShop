import React, { useState } from "react";
import { ProductDetails } from "../redux/slices/ProductSlice/";
import { Link } from "react-router-dom";
import { useShoppingCart } from "./ShoppingCart/ContextShoppingCart";
import { Button } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../hooks";


interface CardProps {
  product: ProductDetails;
}


const ProductCard: React.FC<CardProps> = ({ product }: CardProps) => {
  const Products = useAppSelector((state) => state.products.productList);
  const {addToCart, openCart} = useShoppingCart()
  const [color, setColor] = useState(Products.find(i => i.id === product.id)?.colors ? Products.find(i => i.id === product.id)?.colors[0] as string : "")
  const [variante, setVariante] = useState(Products.find(i => i.id === product.id)?.sizes ? Products.find(i => i.id === product.id)?.sizes[0] as string : "")
  const [quantity, setQuantity] = useState(1)

  const { id } = product
  
  function getQuantityMinus(e: any){
    e.preventDefault();
    if(quantity>1){
    setQuantity(quantity - 1)
    } else {
      setQuantity(1)
    }
}
  function getQuantityPlus(e: any){
  e.preventDefault();
  setQuantity(quantity + 1)
}
  function getItemColor(e: any){
        e.preventDefault();
        setColor(e.target.value);
  }

  function getItemVariant(e: any){
        e.preventDefault();
        setVariante(e.target.value);
}
  function setAll(e: any){
        e.preventDefault();
        addToCart(product.id, quantity, color, variante);
        setQuantity(1)
        openCart()
        /*const input = document.getElementById("val") as HTMLInputElement || null;
        console.log(input.value)
        if(input.checked === true){
        input.checked = false
        }*/

  }

  return (
   
    <div className="flex flex-col border border-gray-400 bg-white shadow-lg    mt-6 mb-6 delay-75 hover:bg-gray-300 hover:scale-105 hover:duration-300  duration-300 rounded-md hover:cursor-pointer">
      {product && (
        <>
         <Link to={`/products/${product.id}`}>
                <img className="rounded-tl-md rounded-tr-md w-64 border-b-2 border-solid border-gray-100" src={product.image} alt={`${product.name}_image`} />
          <h6 className="pl-2 flex items-start font-medium mt-1 text-2xl ">${product.price}</h6>

          <h5 className="pl-2 mb-4 flex items-start w-64 font-light	 ">{product.name}</h5>

      {/* <div className="d-flex mt-auto"> */}
      
        </Link>
          {
        <div className="relative w-[100%]">
        <input type="checkbox" className="absolute opacity-0 peer px-10 inline-flex aboslute inset-x-0 w-full h-12 z-10 cursor-pointer"></input>
        <span className="p-5 items-center text-orange-600 transition-transform duration-500 peer-checked:text-black"><ShoppingCartIcon fontSize="large"/></span>
        <br/><br/>
        <div className="bg-gray-transparent overflow-hidden transition-all duration-500 max-h-0 peer-checked:max-h-40">
        <div className="d-flex mt-auto">
        { 
        (
        <div><div className="inline-flex space-x-5" >
          <div className="d-flex aling-items-center justify-content-center" style={{gap: ".5rem"}}>
          <Button className="py-1 px-3 rounded w-100 bg-yellow text-black font-bold"  onClick={getQuantityMinus}>-</Button>
          </div>
              <div  className="fs-3">{quantity}</div> 
          <div> 
          <Button className="py-1 px-3 rounded w-100 bg-yellow text-black font-bold"  onClick={getQuantityPlus}>+</Button>
          </div>
         </div>
         <div>
         <div className="inline-flex space-x-10 space-y-0">
         <div>
         <label className="block text-sm font-medium text-black">Color</label>
         <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={getItemColor}> 
          {product?.colors.map((i) => {
          return (
          <option value={i}>{i}</option>
          )})
          }</select>
          </div>
          <div>
          <label className="block text-sm font-medium text-black">Variante</label>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-1.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={getItemVariant}> 
          {product.sizes?.map((i) => {
          return (
          <option value={i}>{i}</option>
          )})
          }
          </select>
          </div>
          </div></div>
         <div className="py-2">
          <Button className="bg-transparent hover:bg-blue-500 text-yellow-700 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={setAll}>Agregar a Carrito</Button>
        </div>
        </div>
      )
      
    }</div>
          
        </div>
        </div>
      }
      
      
        </>
      )
      
      }
    </div>
  
  );
};

export default ProductCard;
