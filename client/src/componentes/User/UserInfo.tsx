import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosGetCall from "../../funciones/axiosGetCall";
import { useAppSelector } from "../../hooks";
import UserInfoShow, { IUserShowProps } from "./UserInfoShow";

const UserInfo = () => {
  const { username } = useAppSelector((state) => state.user);
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate();
  const [info, setInfo] = useState<IUserShowProps>({
    name: "",
    username: "",
    email: "",
    birthday: "",
    confirmed: false,
  });

  useEffect(() => {
    if (username)
      console.log('cambio');
      axiosGetCall(`/users/getuser/${username}`)
        .then(({ data }) => {
          const { name, username, email, birthday, confirmed } = data.user;
          setInfo({ name, username, email, birthday, confirmed });
          setDisplay(true);
        })
        .catch(() => navigate("/unauthorized"));
  }, [username, navigate]);

  return <>{display ? <UserInfoShow user={info} /> : <>Loading</>}</>;
};

export default UserInfo;
