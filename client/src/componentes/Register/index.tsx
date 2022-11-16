import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import RegisterForm from "./RegisterForm";
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {

  const credentialResponse = (response:any) => {
    console.log(response.profileObj);
  };

  return (
    <div className="flex flex-col items-center bg-[#FFFDE7]">
      <h4 className="mt-4">Bienvenido a </h4>
      <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
      <h3>Regístrate</h3>
      <RegisterForm />
      <GoogleLogin
        onSuccess={credentialResponse}
        onError={() => {
          console.log('Login Failed');
        }}
      />;
    </div>
  );
};

export default Register;
