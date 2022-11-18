import React from "react";
import { Link } from "react-router-dom";
import ConfirmMailButton from "./ConfirmMailButton";

export interface IUserShowProps {
  name: string;
  username: string;
  email: string;
  birthday: string;
  confirmed: boolean;
}

interface IProps {
  user: IUserShowProps;
}

const UserInfoShow = ({ user }: IProps) => {
  const { name, username, email, birthday, confirmed } = user;
  return (
    <div className="w-9/12 max-w-sm p-4 m-auto my-8 border border-black border-solid shadow-2xl rounded-lg bg-zinc-300">
      <h1 className="flex items-center justify-center text-2xl">
        Perfíl de {name}
      </h1>
      <UserFields name="Nombre" value={name} />
      <UserFields name="Nombre de usuario" value={username} />
      <UserFields name="E-Mail" value={email} />
      <UserFields name="Cumpleaños" value={birthday} />
      <Link
        to="/UserEdit"
        state={{
          username,
          name,
          email,
          birthday,
        }}
      >
        <button
          disabled={confirmed}
          className="p-2 bg-yellow rounded-lg font-bold"
        >
          Editar Información
        </button>
      </Link>
      {confirmed ? null : <ConfirmMailButton email={email} />}
    </div>
  );
};

export default UserInfoShow;

// ---------- ---------- User Info ---------- ----------

interface IFieldsProps {
  name: string;
  value: string;
}

const UserFields = ({ name, value }: IFieldsProps) => {
  return (
    <div className="text-start my-4 flex items-center justify-start">
      <p className="font-bold mr-4">{name}: </p>
      <p className="font-bold">{value}</p>
    </div>
  );
};
