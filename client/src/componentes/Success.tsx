import React from "react";
import { ImHome3 } from "react-icons/im";
import { useShoppingCart } from "./ShoppingCart/ContextShoppingCart";
import { Link } from "react-router-dom";
import Header from "./Header";
const henryFull = require("../assets/henryShop.png");

const Success = () => {

  const { setEmptyCart } = useShoppingCart();

  return (
    <div className="w-full flex flex-col items-center h-screen">
      <Header />

      <div className="mt-32 flex flex-col items-center gap-4">
        <img src={henryFull} className="w-64" />
        <h5>Gracias por tu compra!</h5>
        <Link to="/">
          <button className="w-fit h-10 bg-yellow flex flex-row gap-4 p-2 items-center rounded-md hover:bg-gray-100 hover:duration-300 duration-300 cursor-pointer border-b-2 border-solid border-black" onClick={setEmptyCart} >
            <ImHome3 className="w-6 h-6" />
            <p>Volver al inicio</p>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
