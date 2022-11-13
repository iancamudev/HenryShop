import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import FormPutProduct from "./FormPutProduct";
const EditProduct = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="mt-4">Editar Producto </h3>
      <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
      <FormPutProduct />
    </div>
  );
};

export default EditProduct;
