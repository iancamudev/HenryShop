import React from "react";
import henryImg from "../../assets/logoHenryBlack.png";
import LoginForm from "./LoginForm";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const REACT_APP_BACKEND_URL:string = (process.env.REACT_APP_BACKEND_URL as string);
  const googleAuth = () => {
    window.open(
      `${REACT_APP_BACKEND_URL}/googleusers/google/callback`,
      '_self'
    );
  };

  const gitAuth = async() => {
    const popup = window.open(
      `${REACT_APP_BACKEND_URL}/githubusers/github`,
      'targetWindow',
      `toolbar=no,
      location=no,
      status=no,
      menubar=no,
      scrollbar=yes,
      resizable=yes,
      width=620,
      height=700`
    );

    await window.addEventListener('message',(event)=>{
      console.log('en evento');
      if(event.origin === REACT_APP_BACKEND_URL){
        if(event.data){
          localStorage.setItem('userSession', JSON.stringify(event.data.user));
          popup?.close();
          navigate('/');
        }
      }
    });
  };

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
      <button onClick={gitAuth}>
        Inicia sesion GitHub
      </button>
    </>
  );
};

export default Login;
