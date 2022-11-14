import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import FormPutProduct from "./FormPutProduct";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const EditProduct = () => {
  const navigate = useNavigate();
  const ChangeRouteToAdmin = () => {
    let path = "/admin";
    navigate(path);
  };
  return (
    <>
      <button className="mt-4">
        <BsFillArrowLeftCircleFill
          onClick={ChangeRouteToAdmin}
          className=" w-10	h-10"
        />
      </button>
      <div className="flex flex-col items-center">
        <h3 className="mt-4">Editar Producto </h3>
        <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
        <FormPutProduct />
      </div>
    </>
  );
};

export default EditProduct;
