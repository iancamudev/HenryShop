import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import { useAppSelector } from "../../hooks";

const UserInfo = () => {
  const { username } = useAppSelector((state) => state.user);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (username)
      axiosGetCall(`/users/${username}`)
        .then(() => setDisplay(true))
        .catch(() => navigate("/unauthorized"));
  }, [username, navigate]);

  return <>{display ? <h1>Perfil de usuario</h1> : <>Loading</>}</>;
};

export default UserInfo;
