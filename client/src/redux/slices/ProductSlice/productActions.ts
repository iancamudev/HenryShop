import axios from "axios";
import { AppDispatch } from "../../store";
import { getProductList, getProductPages } from "./index";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://localhost:3001";

export const getAllProducts = (page?: number) => (dispatch: AppDispatch) => {
  axios
    .get(
      page ? `${BACKEND_URL}/products?page=${page}` : `${BACKEND_URL}/products`
    )
    .then(({ data }) => {
      dispatch(getProductList(data.docs));
      dispatch(getProductPages(data.totalPages));
    })
    .catch((error) => {
      console.error(error);
    });
};
export const getProductsByName = (name: string) => (dispatch: AppDispatch) => {
  axios
    .get(`${BACKEND_URL}/products?name=${name}}`)
    .then(({ data }) => dispatch(getProductList(data.docs)))
    .catch((error) => {
      console.error(error);
    });
};
