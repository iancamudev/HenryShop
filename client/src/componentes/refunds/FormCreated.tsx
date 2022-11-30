import React from "react";
import { Link } from "react-router-dom";

export const FormCreated = () => {


    return (
        <div>
            <h1>Se envio el formulario</h1>
            <Link to="/">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Volver a home</button>
            </Link>
            
            <Link to="/shopping" >
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Mis compras</button>
            </Link>
            
        </div>
    )
};