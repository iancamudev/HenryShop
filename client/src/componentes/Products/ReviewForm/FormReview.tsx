import React, { useState } from "react";
import { Rating, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppSelector } from "../../../hooks";
import axiosPutCall from "../../../funciones/axiosPutCall";

interface IFormReviewProps {
  rating?: number;
  text?: string;
  putRute?: boolean;
  reviewId?: string;
}

interface IFormData {
  text: string;
}

const schema = yup
  .object({
    text: yup.string().required("El texto es un campo obligatorio"),
  })
  .required();

const FormReview = ({ rating, text, putRute, reviewId }: IFormReviewProps) => {
  const { id: productId } = useAppSelector(
    (state) => state.products.productDetail
  );
  const [result, setResult] = useState("");
  const [ratingValue, setRatingValue] = useState(rating || 1);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  text && setValue("text", text);

  const handlerSubmit = handleSubmit((value) => {
    setResult("");
    if (putRute) {
      axiosPutCall(`/reviews/${reviewId}`, {
        text: value.text,
        rating: ratingValue,
      })
        .then(({ data }) => {
          window.location.reload();
        })
        .catch((e) => setResult(e.response.data.message));
    } else {
      axiosPostCall(`/reviews`, {
        productId: productId,
        text: value.text,
        rating: ratingValue,
      })
        .then(({ data }) => {
          window.location.reload();
        })
        .catch((e) => setResult(e.response.data.message));
    }
  });

  return (
    <form
      onSubmit={handlerSubmit}
      className="flex justify-center items-center flex-col w-10/12 m-auto mt-4 border-2 border-black border-solid rounded-2xl py-4"
    >
      <h4 className="mb-4">Deja tu reseña</h4>
      <Typography component="legend">Rating</Typography>
      <Rating
        className="mb-4"
        name="simple-controlled"
        value={ratingValue}
        onChange={(event, newValue) => {
          if (newValue) setRatingValue(newValue);
        }}
      />
      <textarea
        className="border border-black border-solid rounded-2xl w-11/12 h-24 p-2"
        {...register("text")}
      ></textarea>
      {errors.text && (
        <p className="w-10/12 py-4 m-auto mt-4 rounded-2xl border-2 border-solid border-red-600 bg-red-300 text-red-600 font-bold">
          {errors.text.message}
        </p>
      )}
      {result && (
        <p className="w-10/12 py-4 m-auto mt-4 rounded-2xl border-2 border-solid border-red-600 bg-red-300 text-red-600 font-bold">
          {result}
        </p>
      )}
      <div>
        <button className="bg-yellow duration-300 hover:bg-gray-200 hover:duration-300 p-2 mt-4 font-bold rounded-sm pl-4 pr-4 border-b-2 border-black">
          Enviar Reseña
        </button>
      </div>
    </form>
  );
};

export default FormReview;
