import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import FormPostProduct from './FormPostProduct'

const CreateProduct =()=>{
    return (
        <div className="flex flex-col items-center">
            <h3 className="mt-4">Crear Producto</h3>
            <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
           <FormPostProduct />
        </div>
    )
}

export default CreateProduct