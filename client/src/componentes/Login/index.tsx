import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import LoginForm from "./LoginForm";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

const Login = () => {

  const handleGoogleSucces = (credentialResponse: any) => {
    console.log(jwt_decode(`${credentialResponse.credential}`));
  }

  return (
    <>
      <div className="flex flex-col items-center bg-[#FFFDE7]">
        <h4 className="mt-4">Bienvenido a </h4>
        <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
        <h3>Inicia Sesión</h3>
        <LoginForm />
      </div>
      <GoogleLogin
        onSuccess={handleGoogleSucces}
        onError={() => {
          console.log('Login Failed');
        }}
        useOneTap
      />
    </>
  );
};

export default Login;
