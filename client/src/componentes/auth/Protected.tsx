import axios from "axios";
import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import { back_url } from "../../variables";

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
          navigate("/");
        });
    }else{
      navigate('/')
    }
  }, [setDisplay, navigate]);

  return <>{display ? children : <>Checking if admin</>}</>;
};

export default Protected;
