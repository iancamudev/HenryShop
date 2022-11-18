import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import RegisterForm from "./RegisterForm";
import jwt_decode from "jwt-decode";

const Register = () => {

  const googleAuth = () => {
    const REACT_APP_BACKEND_URL:string = (process.env.REACT_APP_BACKEND_URL as string);
    window.open(
      `${REACT_APP_BACKEND_URL}/googleusers/google/callback`,
      '_self'
    );
  }

  return (
    <div className="flex flex-col items-center bg-[#FFFDE7]">
      <h4 className="mt-4">Bienvenido a </h4>
      <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
      <h3>Regístrate</h3>
      <RegisterForm />
      <button onClick = {googleAuth}>
        Regístrate con Google
      </button>
    </div>
  );
};

export default Register;
