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
<<<<<<< HEAD
      console.log('cambio');
=======
>>>>>>> 13b177a72cccc4182a0add89fbb8898c1cbb4fe8
      axiosGetCall(`/users/getuser/${username}`)
        .then(({ data }) => {
          const { name, username, email, birthday, confirmed } = data.user;
          setInfo({ name, username, email, birthday, confirmed });
          setDisplay(true);
        })
        .catch((e) => {
          console.log("por aqui");
          console.log(e)
          navigate("/unauthorized");
        });
  }, [username, navigate]);

  return <>{display ? <UserInfoShow user={info} /> : <>Loading</>}</>;
};

export default UserInfo;
