import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import dayjs, { Dayjs } from "dayjs";
import { MobileDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import axiosPutCall from "../../funciones/axiosPutCall";
import FormSubmittingLoader from "../FormSubmittingLoader";

const errorStyle =
  "mt-1 text-red-600 font-bold bg-red-100 p-1 border-2 border-red-700 border-solid rounded-2xl";
const inputStyle =
  "border border-black border-solid w-full rounded-sm pl-2 py-1";

interface IFormData {
  name: string;
  username: string;
  email: string;
}

const schema = yup
  .object({
    name: yup.string().default("a").required("Este campo es obligatorio"),
    username: yup.string().required("Este campo es obligatorio"),
    email: yup
      .string()
      .email("Debe ser un mail valido")
      .required("Este campo es obligatorio"),
  })
  .required();

const UserEdit = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const location = useLocation();
  const { username, name, email, birthday } = location.state;

  const [newBirthday, setNewBirthday] = React.useState<Dayjs | null>(
    dayjs(new Date(birthday))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });
  setValue("name", name);
  setValue("username", username);
  setValue("email", email);

  const handleDateChange = (newValue: Dayjs | null) => {
    setNewBirthday(newValue);
  };

  const handlerSubmit = handleSubmit(({ username, name, email }) => {
    setSubmitting(true);
    setResult("");
    const birthday = newBirthday?.format("YYYY-MM-DD");

    axiosPutCall(`/users`, {
      username,
      name,
      email,
      birthday,
    })
      .then(({ data }) => {
        const newToken = JSON.stringify(data);
        window.localStorage.setItem("userSession", newToken);
        navigate("/");
      })
      .catch((e) => setResult(e.message))
      .finally(() => {
        setSubmitting(false);
      });
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center flex-col items-center w-9/12 m-auto my-8 max-w-md"
    >
      <h4 className="mb-4 font-bold md:text-3xl">Edición de datos</h4>

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
          placeholder="Nombre de usuario"
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
          placeholder="E-Mail: example@gmail.com"
          {...register("email")}
          className={inputStyle}
        />
        {errors?.email && <p className={errorStyle}>{errors.email.message}</p>}
      </div>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label="Fecha de Nacimiento"
          inputFormat="YYYY/MM/DD"
          value={newBirthday}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      {result.length ? <p className={errorStyle}>{result}</p> : null}
      {submitting ? (
        <FormSubmittingLoader />
      ) : (
        <>
          <button className="bg-yellow duration-300 hover:bg-gray-200 hover:duration-300 w-full py-2 rounded-sm font-bold my-1.5 border-b-2 border-black">
            Guardar Cambios
          </button>
          <Link
            to="/User"
            className="bg-yellow duration-300 hover:bg-gray-200 w-full py-2 rounded-sm font-bold my-1.5 mb-8 border-b-2 border-black"
          >
            Volver
          </Link>
        </>
      )}
    </form>
  );
};

export default UserEdit;
