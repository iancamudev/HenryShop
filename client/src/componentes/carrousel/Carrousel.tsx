import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";

import { getBestOffers } from "../../redux/slices/ProductSlice/productActions";
import { Loading } from "../Loading";

import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router-dom";
import { current } from "@reduxjs/toolkit";

function Carrousel(args: any) {
  const bestProducts: any = useAppSelector(
    (state) => state.products.carrouselList
  );
  const { carrouselLoading } = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    dispatch(getBestOffers());
  }, [dispatch]);

  const nextImg = () => {
    clearInterval(myInterval);
    setCurrentImg(currentImg === productLength - 1 ? 0 : currentImg + 1);
  };

  let myInterval: any;

  useEffect(() => {
    myInterval = setInterval(nextImg, 5000);
  }, [currentImg]);

  const productLength = bestProducts?.length;

  const prevImg = () => {
    clearInterval(myInterval);
    setCurrentImg(currentImg === 0 ? productLength - 1 : currentImg - 1);
  };

  const touchEndHandler = (e: any) => {
    let x = e.changedTouches[0].clientX;
    if (x < window.innerWidth / 2) {
      nextImg();
    } else {
      prevImg();
    }
  };
  if (carrouselLoading) {
    return <Loading />;
  }
  if (!carrouselLoading && productLength <= 1) return null;
  // return <h4 className="w-10/12 mt-4 font-bold max-w-[550px]">No hay ofertas o no se han podido cargar</h4>

  return (
    <div className="flex flex-col bg-gray-800 w-full h-auto justify-center items-center">
      <div className="flex flex-row justify-center items-center  pb-4 pt-6">
        <button
          onClick={prevImg}
          className="absolute mr-72 bg-yellow rounded-full items-center p-2 border-b-2 border-solid border-black duration-300 hover:duration-300 cursor-pointer hover:bg-gray-400 "
        >
          <MdArrowBackIosNew className="w-6 h-6" />
        </button>
        {bestProducts?.map((e: any, index: any) => {
          return (
            <div
              className="flex flex-row justify-center items-center"
              key={`bestProd_${index}`}
            >
              {currentImg === index && (
                <div
                  className="flex flex-col items-center min-h-[408px]"
                  onTouchEnd={touchEndHandler}
                >
                  <div className="select-none bg-yellow rounded-md w-fit pl-4 pr-4 font-bold text-lg absolute border-b-2 border-solid border-black">
                    {e.discount}% OFF
                  </div>
                  <div className="min-h-[380px] px-5 bg-white w-72 rounded-3xl mt-4 p-2 hover:bg-gray-400 duration-300 hover:duration-300 cursor-pointer">
                    <Link to={`/products/${e.product.id}`}>
                      <img
                        key={index}
                        src={e.product.image ? e.product.image : <Loading />}
                        alt={e.product.name}
                      />
                    </Link>
                    <p className=" items-center text-gray-600  line-through text-sm">
                      ${e.product.price[e.product.price.length - 2]}
                    </p>
                    <p className=" items-center text-black font-bold text-lg">
                      ${e.product.price[e.product.price.length - 1]}
                    </p>
                    <p className="mb-4 items-center text-black font-bold">
                      {e.product.name}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <button
          onClick={nextImg}
          className="absolute ml-72 bg-yellow rounded-full items-center p-2 border-b-2 border-solid border-black duration-300 hover:duration-300 cursor-pointer hover:bg-gray-400 "
        >
          <MdArrowBackIosNew className="rotate-180 w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-row gap-2 w-72 items-stretch mb-6">
        {bestProducts?.map((el: any, index: any) => {
          return (
            <div
              id={el.product.id}
              className={
                currentImg === index
                  ? "h-2 w-auto rounded-xl flex-auto bg-yellow border-b-2 border-solid border-black duration-300"
                  : "h-2 w-auto rounded-xl flex-auto bg-gray-300 duration-300"
              }
              key={`product_${index}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Carrousel;
