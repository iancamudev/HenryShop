import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllProducts } from "../redux/slices/ProductSlice/productActions";
import ProductCard from "./ProductCard";
const gifLoading = require("../assets/gifLoading.gif");

const ProductCards = () => {
  const Products = useAppSelector((state) => state.products.productList);
  const filters = useAppSelector((state) => state.filterState.filters);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts(null, filters));
  }, [dispatch, filters]);
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <h3 className="p-4">Nuestros Productos🚀</h3>
        <div className="bg-yellow h-3 negative"></div>
      </div>
      {Products.length ? (
        Products.map((producto, index) => {
          return <ProductCard key={index} product={producto} />;
        })
      ) : (
        <img src={gifLoading} className="w-32 h-32 mt-10" />
      )}
    </div>
  );
};

export default ProductCards;
