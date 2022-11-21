import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import UserLoader from "./UserLoader";

interface IProtectedProps {
  children: JSX.Element;
}

const Protected = ({ children }: IProtectedProps) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const session = window.localStorage.getItem("userSession");
    setDisplay(false)
    if (session) {
      console.log('checking admin...')
      axiosGetCall('/users/isAdmin')
        .then(() => {
          console.log('yes admin')
          setDisplay(true);
        })
        .catch(() => {
          console.log('bye no admin')
          navigate("/");
        });
    }else{
      console.log('bye no admin 2')
      navigate('/')
    }
  }, [setDisplay, navigate]);

  return <>{display ? children : <UserLoader />}</>;
};

export default Protected;
