import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <h4>Bienvenido a </h4>
      <img src={henryImg} alt="Logo de Henry" className="w-full" />
      <h3>Inicia Sesión</h3>
      <LoginForm />
    </div>
  );
};

export default Login;
