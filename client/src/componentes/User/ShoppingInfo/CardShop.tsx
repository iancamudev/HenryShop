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

  const { username } = useParams();
  const dispatch = useAppDispatch();
  
  
  
  return (
      <div>
       {<div className="rounded-tl-md rounded-tr-md w-full">        
        
        
        <img
        className="rounded-tl-md rounded-tr-md w-64 hover:scale-105 hover:duration-300  duration-300 "
        src={products.image}
        alt={"no hay"}
        loading="lazy"
      />
      </div>

        } 
        
      </div>

  )
};

export default ShoppingCards;