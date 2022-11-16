import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import LoginForm from "./LoginForm";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Login = () => {
  const REACT_APP_BACKEND_URL:string = (process.env.REACT_APP_BACKEND_URL as string);
  const googleAuth = () => {
    window.open(
      `${REACT_APP_BACKEND_URL}/googleusers/google/callback`,
      '_self'
    );
  }


  return (
    <>
      <div className="flex flex-col items-center bg-[#FFFDE7]">
        <h4 className="mt-4">Bienvenido a </h4>
        <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
        <h3>Inicia Sesión</h3>
        <LoginForm />
      </div>
      <button onClick={googleAuth}>
        Inicia sesion con Google
      </button>
    </>
  );
};

export default Login;
