import axios from "axios";
import { AppDispatch } from "../../store";
import { getProductList } from "./index";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://localhost:3001";

export const getAllProducts = () => (dispatch: AppDispatch) => {
  axios
    .get(`${BACKEND_URL}/products`)
    .then(({ data }) => {
      dispatch(getProductList(data));
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getProductsByName = (name: string) => (dispatch: AppDispatch) => {
  axios
    .get(`${BACKEND_URL}/products/${name}}`)
    .then(({ data }) => dispatch(getProductList(data)))
    .catch((error) => {
      console.error(error);
    });
};
