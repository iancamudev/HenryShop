import { Offcanvas, Stack } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { useShoppingCart } from "./ContextShoppingCart";
import { Drawer } from "@mui/material";
import { useAppSelector } from "../../hooks";
import axios from "axios";
import { redirect } from "react-router-dom";
import sc from "../../assets/SC.gif";
import { IoMdCloseCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import axiosGetCall from "../../funciones/axiosGetCall";
import { userInfo } from "os";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
/*<Offcanvas show={isOpen} onHide = {closeCart}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap = {3}>
                    {cartItems.map(item => (
                        <CartItem key = {item.id} {...item}/>
                    ))}
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>*/

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  const Products = useAppSelector((state) => state.products.productList);
  const User = useAppSelector((state) => state.user);

  const token =
    JSON.parse(window.localStorage.getItem("userSession") as string) &&
    (JSON.parse(window.localStorage.getItem("userSession") as string)
      .token as string);

  const compraHandler = async () => {
    await axios
      .post(
        `${BACKEND_URL}/products/payment`,
        { products: cartItems },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        console.log(data.response.response.init_point);

        window.open(data.response.response.init_point, "_blank");
      });
  };
  return (
    <Drawer anchor="right" open={isOpen} onClose={closeCart}>
      <div className="flex"><div className="text-center py-5 px-10  font-bold font-serif text-4xl ">
        Carrito de Compras
      </div>
      <button className="w-8 h-8 text-black rounded-lg border border-gray-300 m-4 bg-yellow" onClick={closeCart}>X</button></div>
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      {cartItems[0] ? (
        <div className="text-center py-10 ms-auto font-bold font-serif text-4xl ">
          Total:{" $"}
          {cartItems.reduce((total, cartItem) => {
            const prod = Products.find((i) => i.id === cartItem.id);
            return total + (prod?.price || 0) * cartItem.quantity;
          }, 0)}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <img src={sc} alt="Shopping Cart" className=" h-80 select-none" />{" "}
          <div className="text-center p-14 px-5 ms-auto font-bold font-serif text-3xl">
            Agrega Productos al Carrito...
          </div>
        </div>
      )}
      <div className="py-4 flex flex-col items-center">
        {User.confirmed ? (
          <button
            style={{ width: "250px" }}
            className="justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            onClick={compraHandler}
          >
            INICIAR COMPRA
          </button>
        ) : (
          <button
            style={{ width: "250px" }}
            className="justify-center items-center bg-gray-500 text-white font-bold py-2 px-4 rounded-full cursor-none"
          >
            NO HABILITADO
          </button>
        )}
      </div>
    </Drawer>
  );
}
