import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import { Loading } from "../Loading";
import UserLoader from "./UserLoader";

interface IProtectedProps {
  children: JSX.Element;
}

const UserProtected = ({ children }: IProtectedProps) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const session = window.localStorage.getItem("userSession");
    console.log(session)
    setDisplay(false);
    if (session) {
      console.log('User protected')
      axiosGetCall("/users/isUser")
        .then(() => {
          setDisplay(true);
        })
        .catch(() => {
          console.log('bye no user')
          navigate("/unauthorized");
        });
    } else {
      console.log('bye no user 2')
      navigate("/unauthorized");
    }
  }, [setDisplay, navigate, children]);

  // Replace with loader
  return <>{display ? children : <Loading />}</>;
};

export default UserProtected;
