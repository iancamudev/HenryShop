import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const errorStyle =
  "mt-1 text-red-600 font-bold bg-red-100 p-1 border-2 border-red-700 border-solid rounded-2xl";
const inputStyle =
  "border border-black border-solid w-full rounded-sm pl-2 py-1";

interface IFormData {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().default("a").required("Este campo es obligatorio"),
    // .email("Debe ser un mail valido"),
    password: yup.string().required("Este campo es obligatorio"),
  })
  .required();

const LoginForm = () => {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(false);
  const [result, setResult] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit((value) => {
    setResult("");

    let back_url = process.env.REACT_APP_BACKEND_URL;
    if (back_url)
      axios
        .post<IFormData>(`${back_url}/users/login`, value)
        .then(({ data }) => {
          localStorage.setItem("userSession", JSON.stringify(data));
          navigate("/");
        })
        .catch((e) => setResult(e.response.data.message));
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 mt-6 mb-10"
    >
      <div className="mb-3.5 w-full">
        <input
          type={"text"}
          placeholder="Nombre de Usuario"
          {...register("username")}
          className={inputStyle}
        />
        {errors?.username && (
          <p className={errorStyle}>{errors.username.message}</p>
        )}
      </div>

      <div className="mb-3.5 w-full">
        <input
          type={"password"}
          placeholder="Contraseña"
          {...register("password")}
          className={inputStyle}
        />
        {errors?.password && (
          <p className={errorStyle}>{errors.password.message}</p>
        )}
      </div>

      <div className="flex self-start">
        <input className="xl:w-4 xl:h-4 xl:mt-1"
          type={"checkbox"}
          name="remember"
          checked={remember}
          onChange={() => setRemember(!remember)}
        />{" "}
        <p className="xl:mb-1 ml-1">Recordar mi sesión</p>
      </div>
      {result.length ? <p className={errorStyle}>{result}</p> : null}
      <div className="flex flex-row justify-center items-center gap-2 sm:gap-3 xl:gap-3">
      <button className="bg-yellow w-auto px-6 py-2  rounded-sm font-bold my-1.5 hover:bg-black hover:text-yellow hover:duration-500 duration-300 shadow-lg">
        Ingresar
      </button>
        <Link
          to="/register"
          className="bg-yellow w-auto py-2 px-4 rounded-sm font-bold my-1.5 hover:bg-black hover:text-yellow hover:duration-500 duration-300 shadow-lg"
        >
          Registrate
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;

// -------------------- Input del Form --------------------

// interface inputProps {
//   name: string;
//   type: string;
//   placeholder: string;
// }

// const FormInput = ({ name, type, placeholder }: inputProps) => {
//   return (
//     <div className="mb-3.5 w-full">
//       <input
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         className="border border-black border-solid w-full rounded-2xl pl-2 py-1"
//       />
//       <ErrorText errorStyle="error" />
//     </div>
//   );
// };

// // -------------------- Text Error del form --------------------
// interface errorProps {
//   errorStyle: string;
// }

// const ErrorText: React.FC<errorProps> = ({ errorStyle }: errorProps) => {
//   return <p className="text-red-600 font-bold text-end">*{errorStyle}</p>;
// };
