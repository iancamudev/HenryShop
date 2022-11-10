import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex flex-col items-center">
      <h4 className="mt-4">Bienvenido a </h4>
      <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
      <h3>Inicia Sesión</h3>
      <LoginForm />
    </div>
  );
};

export default Login;
