import React, { useState } from "react";
import { Rating, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppSelector } from "../../../hooks";

interface IFormData {
  text: string;
}

const schema = yup
  .object({
    text: yup.string().required("El texto es un campo obligatorio"),
  })
  .required();

const FormReview = () => {
  const navigate = useNavigate();
  const { id: productId} = useAppSelector((state) => state.products.productDetail);
  const [result, setResult] = useState("");
  const [ratingValue, setRatingValue] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const handlerSubmit = handleSubmit((value) => {
    setResult("");
    axiosPostCall("/reviews", {
      productId: productId,
      text: value.text,
      rating: ratingValue,
    })
      .then(({ data }) => {
        console.log(data);
        alert("Reseña enviada");
      })
      .catch((e) => setResult(e.response.data.message));
  });

  return (
    <form onSubmit={handlerSubmit}>
      <h4>Deja tu reseña</h4>
      <Typography component="legend">Rating</Typography>
      <Rating
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          if (newValue) setRatingValue(newValue);
        }}
      />
      <input type={"text"} {...register("text")} />
      {errors.text && <p>{errors.text.message}</p>}
      {result && <p>{result}</p>}
      <button>Enviar Reseña</button>
    </form>
  );
};

export default FormReview;
