import React from "react";
import ProductCards from "../ProductCards";
const ProductList = () => {
  return (
    <>
      <div className="mb-4">
        <h3 className="p-4">Nuestros Productos🚀</h3>
        <div className="bg-yellow h-3 negative"></div>
      </div>
      <ProductCards />
    </>
  );
};
export default ProductList;
