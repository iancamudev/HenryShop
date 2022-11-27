import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getAllProducts } from "../redux/slices/ProductSlice/productActions";
import ProductCard from "./ProductCard";
import { Loading } from "./Loading";
// const gifLoading = require("../assets/gifLoading.gif");

const ProductCards = () => {
  const { filters } = useAppSelector((state) => state.filterState);
  const { productList, loading, error } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts(null, filters));
  }, [dispatch, filters]);

  if (loading) {
    return <Loading />;
  }

  if (error) return <h1>{error}</h1>;
  console.log(productList)

  return (
    <div className="flex flex-col items-center">
      {productList.length ? (
        productList.map((producto, index) => {
          return <ProductCard key={index} product={producto} />;
        })
      ) : (
        <div>
          <p>No se encontraron productos</p>
        </div>
      )}
    </div>
  );
};

export default ProductCards;
