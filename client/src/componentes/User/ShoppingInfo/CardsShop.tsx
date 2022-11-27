
import React, { useEffect } from "react";
import CardShop from "./CardShop"
import { getAllShoppingByUser } from "../../../redux/slices/ShoppingSlice/shoppingActions";
import { getUserByUsername } from "../../../redux/slices/AdminSlice/adminActions";
import { setUserData } from "../../../redux/slices/UserSlice/UserActions";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";

// const gifLoading = require("../assets/gifLoading.gif");

const ShoppingCards = () => {
  const dispatch = useAppDispatch();
  const { shoppingList } = useAppSelector(
    (state) => state.shopping
  );
  const userList = useAppSelector(
    (state) => state.admin.usersList
  )
  const username = useAppSelector((state) => state.user.username)
  useEffect(() => {
    dispatch(getAllShoppingByUser(String(username)));
  }, [dispatch, username]);

  useEffect(() => {
    dispatch(getUserByUsername(String(username)));
  }, [dispatch, username]);
  const shopsByUser = userList[0].shopping
  const total = shopsByUser.map(e => {
    return shoppingList.filter(a => a.idShop === e.toString())
   })
   console.log(total)  
  const totalPrice = total.map(el => el.reduce(function (acc, obj){ return acc + obj.total_Price}, 0))


  //shoppingList: array info de cada compra con su idshop
  //shopsByUser: idshop de cada compra
  return (
    <div className="flex w-full bg-white">
      <div>
      {
          total.length ? (
            total.map((producto, index) => 
              <div key={index} className = "mx-10 my-3   w-[76rem] border border-black rounded-xl">
                <div className = "bg-slate-200 h-20 rounded-t-xl">
                <div> Pedido realizado
                </div>
                <div> Total: {producto.reduce((acc, obj) => { return acc + obj.total_Price}, 0)}
                </div>


                </div>
                {
                producto.map((el) => 
                <div> <CardShop  products={el} />
                </div>)
              }</div>
            )
          
        ) : (
            <div>
              <p>No se encontraron productos</p>
            </div>
          )}
      </div>
    </div>
  );
};
//<p>{shoppingList[0].products[0].name}</p>
export default ShoppingCards;
