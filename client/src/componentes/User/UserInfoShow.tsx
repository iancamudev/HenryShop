import React from "react";
import { Link } from "react-router-dom";
import ConfirmMailButton from "./ConfirmMailButton";
// import { TailSpin } from "react-loader-spinner";

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
    <div className="m-auto my-8 w-full lg:text-xl">
      <div className='md:flex md:justify-evenly lg:justify-center'>
        <div className="md:w-7/12 md:flex md:flex-col md:items-center lg:w-5/12">
          <h1 className="text-3xl">Perfíl de {name}</h1>
          <hr className='md:w-8/12' />
          <UserFields name="Nombre" value={name} />
          <UserFields name="Nombre de usuario" value={username} />
          <UserFields name="E-Mail" value={email} />
          <UserFields name="Cumpleaños" value={birthday} />
        </div>
        <div className="flex flex-col items-center md:w-2/12 lg:justify-center">
          <Link to="/shopping">
            <button
              className={`bg-yellow p-2 rounded-sm font-bold border-b-2 border-black`}
            >
              Mis Compras
            </button>
          </Link>
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
              disabled={!confirmed}
              className={`${
                confirmed ? "bg-yellow" : "bg-slate-400 line-through"
              } p-2 rounded-sm font-bold border-b-2 border-black mt-4 lg:mt-8`}
            >
              Editar Información
            </button>
          </Link>
        </div>
      </div>
      {false ? null : <ConfirmMailButton email={email} />}
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
    <div className="text-center my-4 flex flex-col items-center justify-center">
      <p className="font-bold">{name}</p>
      <p className="">{value}</p>
    </div>
  );
};
