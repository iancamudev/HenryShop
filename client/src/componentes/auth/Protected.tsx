import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
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
      const { token } = JSON.parse(session);
      axios
        .get(`${back_url}/users/isAdmin`, {
          headers: {
            authorization: `bearer ${token}`,
          },
        })
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
  }, [setDisplay, navigate, children]);

  return <>{display ? children : <>Checking if admin</>}</>;
};

export default Protected;
