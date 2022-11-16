import { useForm } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const errorStyle =
  "mt-1 text-red-600 font-bold bg-red-100 p-1 border-2 border-red-700 border-solid rounded-2xl";
const inputStyle =
  "border border-black border-solid w-full rounded-2xl pl-2 py-1";
interface IFormData {
  username: string;
  name: string;
  email: string;
  birthday: Dayjs | null;
  password: string;
}

const schema = yup
  .object({
    name: yup.string().required("Este campo es necesario"),
    username: yup.string().required("Este campo es necesario"),
    password: yup.string().required("Este campo es necesario"),
    email: yup.string().required("Este campo es necesario"),
  })
  .required();

const RegisterForm = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");

  const [value, setValue] = React.useState<Dayjs | null>(dayjs(Date.now()));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  const handlerSubmit = handleSubmit(({ username, name, email, password }) => {
    setResult("");
    const back_url = process.env.REACT_APP_BACKEND_URL;
    const birthday = value?.format("YYYY-MM-DD");
    axios
      .post(`${back_url}/users`, {
        username,
        name,
        email,
        password,
        birthday,
      })
      .then(({ data }) => {
        localStorage.setItem("userName", data.username);
        navigate("/");
      })
      .catch((e) => setResult(e.message));
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 m-auto"
    >
      <div className="mb-3.5 w-full">
        <input
          type={"text"}
          placeholder="Nombre"
          {...register("name")}
          className={inputStyle}
        />
        {errors?.name && <p className={errorStyle}>{errors.name.message}</p>}
      </div>
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
          type={"text"}
          placeholder="eMail: example@gemail.com"
          {...register("email")}
          className={inputStyle}
        />
        {errors?.email && <p className={errorStyle}>{errors.email.message}</p>}
      </div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Fecha de Nacimiento"
          inputFormat="YYYY/MM/DD"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          className="mb-4"
        />
      </LocalizationProvider>
      <div className="mb-3.5 mt-4 w-full">
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
      {result.length ? <p className={errorStyle}>{result}</p> : null}
      <button className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5">
        Resgistrarse
      </button>
      <Link
        to="/login"
        className="bg-[#d9d9d9] w-full py-2 rounded-2xl font-bold my-1.5 mb-8"
      >
        Iniciar Sesión
      </Link>
    </form>
  );
};

export default RegisterForm;
