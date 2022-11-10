import React, { useState } from "react";
import { Link } from "react-router-dom";
import henryImg from "../assets/logoHenryBlack.png";

interface LoginState {
  user: string;
  pass: string;
}

const Login = () => {
  const [input, setInput] = useState<LoginState>({
    pass: "",
    user: "",
  });
  const [disable, setDisable] = useState(true);
  const [remember, setRemember] = useState(false);

  const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  return (
    <div className="flex flex-col items-center">
      <h4 className="mt-4">Bienvenido a </h4>
      <img src={henryImg} alt="Logo de Henry" className="w-3/4" />
      <h3>Inicia Sesión</h3>
      <form
        onSubmit={handlerSubmit}
        className="flex justify-center flex-col items-center w-9/12 m-auto"
      >
        <FormInput
          type={"text"}
          placeholder="Mail: example@gmail.com"
          name="user"
          value={input.user}
          onChange={handlerChange}
        />
        <FormInput
          type={"password"}
          placeholder="Contraseña"
          name="pass"
          value={input.pass}
          onChange={handlerChange}
        />
        <div className="self-start">
          <input
            type={"checkbox"}
            name="remember"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />{" "}
          Recordar mi sesión
        </div>
        <button
          type={"submit"}
          className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5"
          disabled={disable}
        >
          Ingresar
        </button>
        <Link
          to="#"
          className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5"
        >
          Registrate
        </Link>
      </form>
    </div>
  );
};

export default Login;

// -------------------- Input del Form --------------------

interface inputProps {
  name: string;
  type: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const FormInput: React.FC<inputProps> = ({
  name,
  type,
  onChange,
  placeholder,
  value,
}: inputProps) => {
  return (
    <div className="mb-3.5 w-full">
      <input
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
      />
      <ErrorText errorText="error" />
    </div>
  );
};

// -------------------- Text Error del form --------------------
interface errorProps {
  errorText: string;
}

const ErrorText: React.FC<errorProps> = ({ errorText }: errorProps) => {
  return <p className="text-red-600 font-bold text-end">*{errorText}</p>;
};
