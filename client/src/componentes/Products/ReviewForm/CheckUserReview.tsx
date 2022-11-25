import React from "react";
import { useAppSelector } from "../../../hooks";
import FormReview from "./FormReview";

const CheckUserReview = () => {
  const { username, confirmed } = useAppSelector((state) => state.user);

  // Si está logueado, no muestr nada
  if (!username) return null;

  // Si no está confirmado, mostrar aviso de que debe confirmar su mail
  if (!confirmed) return <ConfirmWarning />;

  return <FormReview />

};

export default CheckUserReview;

const ConfirmWarning = () => {
  return <div>
    Warning Sign
  </div>;
};