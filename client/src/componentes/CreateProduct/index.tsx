import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import FormPostProduct from "./FormPostProduct";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const CreateProduct = () => {
  const navigate = useNavigate();
  const ChangeRouteToAdmin = () => {
    let path = "/admin";
    navigate(path);
  };
  return (
    <>
      <button className="mt-4">
        <BsFillArrowLeftCircleFill
          className=" w-10 h-10"
          onClick={ChangeRouteToAdmin}
        />
      </button>
      <div className="flex flex-col items-center">
        <h3 className="mt-4">Crear Producto</h3>
        <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
        <FormPostProduct />
      </div>
    </>
  );
};

export default CreateProduct;
