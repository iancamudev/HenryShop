import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllShoppingByUser } from "../../../redux/slices/ShoppingSlice/shoppingActions"; 
import Header from "../../Header";
import { TbPlus, TbMinus } from "react-icons/tb";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { ShoppingDetails } from "../../../redux/slices/ShoppingSlice";

interface CardShop {
  products: ShoppingDetails;
  }
  
  const ShoppingCards = ({ products } : CardShop) => {  
  
  return (
      <div>
       {<div className="flex justify-between border border--slate-500 px-8  rounded-b-xl w-full">        
        <div className="pl-5">
        <img
        className="pt-2 rounded-tl-md rounded-tr-md w-40 hover:scale-105 hover:duration-300  duration-300 "
        src={products.image}
        alt={"no hay"}
        loading="lazy"
      />
      </div>
      <div className="pt-6 w-1/3 ">
      <div className="pt-5 pb-3  text-xl font-bold">{products.name} <span className="px-2 text-xl text-slate-400">{products.variante}</span>
      </div>
      <div className="pb-3" >Cantidad: {products.quantity}
      </div>
      <div className="pb-3">Precio unitario: {products.price}
      </div>
      </div>
      <div className="w-48 pt-12 font-semibold">Descripción: <p className="pt-3 font-normal">{products.description}</p></div>




      </div>
        } 
        
      </div>

  )
};

export default ShoppingCards;