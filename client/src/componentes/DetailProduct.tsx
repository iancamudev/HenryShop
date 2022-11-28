import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useParams } from "react-router-dom";
import { getProductsById } from "../redux/slices/ProductSlice/productActions";
import Header from "./Header";
import { TbPlus, TbMinus } from "react-icons/tb";
import { useShoppingCart } from "./ShoppingCart/ContextShoppingCart";
import ReviewList from "./Products/ReviewList";

export const DetailProduct: React.FunctionComponent = () => {
  const producto = useAppSelector((state) => state.products.productDetail);
  const Products = useAppSelector((state) => state.products.productList);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [value, setValue] = useState(1);
  const { addToCart } = useShoppingCart();
  const [variante, setVariante] = useState(
    Products.find((i) => i.id === id)?.variants
      ? (Products.find((i) => i.id === id)?.variants[0].value as string)
      : ""
  );

  useEffect(() => {
    dispatch(getProductsById(String(id)));
  }, [dispatch, id]);
  const handleClickPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(value);
  };
  const handleClickMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  function getItemVariant(e: any) {
    e.preventDefault();
    setVariante(e.target.value);
  }
  function setAll(e: any) {
    e.preventDefault();
    addToCart(id!, quantity, variante);
    setQuantity(1);
  }
  return (
    <>
      <Header />
      <div className="mt-4 lg:flex">
        <img
          className="mt-4 mx-auto w-9/12 max-w-[85vh]"
          src={producto.image && producto.image}
          alt="Detalle_Producto"
        />
        <div>
          <div>
            <h2 className="mt-4">{producto.name}🚀</h2>
          </div>
          <div className="mt-2 mb-8">
            <h4 className="text-left ml-4">Rating: {producto.rating}</h4>
            <h3 className="text-left ml-4 font-bold mb-4 mr-4">
              ${producto.price}
            </h3>
            <hr />
            <div className="flex items-center justify-center gap-4">
              <div className="border-r-2 p-4 border-black ">
                <p className="text-xl font-bold mb-3 mt-4">Quantity</p>
                <div className="flex items-center justify-center gap-2">
                  <div onClick={handleClickPlus}>
                    <TbPlus className="border-black-500" />
                  </div>
                  <input
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    className="bg-yellow p-1 w-8 font-bold text-center"
                    type="number"
                    name="cantidad"
                    value={quantity}
                  />
                  <div onClick={handleClickMinus}>
                    <TbMinus className="border-black-500" />
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="mt-9 mb-4 p-2">
                  <p className="text-xl font-bold mb-3">Variante</p>
                  <select
                    className="bg-yellow font-bold p-2"
                    name="variants"
                    onChange={getItemVariant}
                  >
                    {producto.variants &&
                      producto.variants.map((el) => {
                        return (
                          <option
                            key={el.value}
                            className="font-bold hover:bg-black hover:text-yellow p-2"
                          >
                            {el.value}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-2 mb-6 text-center ml-8">
              <button
                className="bg-yellow duration-300 hover:bg-gray-200 hover:duration-300 p-2 mt-4 font-bold rounded-3xl pl-4 pr-4 border-b-2 border-black"
                onClick={setAll}
              >
                Agregar a carrito
              </button>
            </div>
            <hr />
            <p className="text-left ml-4 mt-6 font-bold">Descripción:</p>
            <p className="text-left ml-4">{producto.description}</p>
            <p className="text-left ml-4 mt-2 font-bold">Caracteristicas:</p>
            <p className="text-left ml-4 mb-2">
              Sizes: {producto.variants && producto.variants.join(", ")}
            </p>
            <hr />
          </div>
        </div>
      </div>
      <ReviewList reviews={producto.reviews} />
    </>
  );
};
