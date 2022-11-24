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
  const dispatch = useAppDispatch();

  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    dispatch(getBestOffers());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      nextImg();
    }, 5000);
  }, [currentImg]);

  const productLength = bestProducts?.length;
  const nextImg = () => {
    setCurrentImg(currentImg === productLength - 1 ? 0 : currentImg + 1);
  };
  const prevImg = () => {
    setCurrentImg(currentImg === 0 ? productLength - 1 : currentImg - 1);
  };
  if (productLength === 0) {
    return <Loading />;
  }
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
            <div className="flex flex-row justify-center items-center">
              {currentImg === index && (
                <div className="flex flex-col items-center">
                  <div className="bg-yellow rounded-md w-fit pl-4 pr-4 font-bold text-lg absolute border-b-2 border-solid border-black">
                    {e.discount}% OFF
                  </div>
                  <div className="px-5 bg-white w-72 rounded-3xl mt-4 p-2 hover:bg-gray-400 duration-300 hover:duration-300 cursor-pointer">
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
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Carrousel;
