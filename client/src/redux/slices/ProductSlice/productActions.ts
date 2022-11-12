import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import { getProductList, getProductPages, getProductDetail } from "./index";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://localhost:3001";

export const getAllProducts =
  (page?: number | null, filters?: Filters) => (dispatch: AppDispatch) => {
    let url = `${BACKEND_URL}/products${page ? `?page=${page}` : "?page="}${
      filters?.name.length ? `&name=${filters.name}` : "&name="
    }${
      filters?.category.length ? `&category=${filters.category}` : "&category="
    }`;

    console.log(url);

    axios
      .get(url)
      .then(({ data }) => {
        dispatch(getProductList(data.docs));
        dispatch(getProductPages(data.totalPages));
      })
      .catch((error) => {
        console.error(error);
      });
  };

export const getProductsById = (id: string) => (dispatch: AppDispatch) => {
  axios
    .get(`${BACKEND_URL}/products/${id}`)
    .then(({ data }) => dispatch(getProductDetail(data)))
    .catch((error) => {
      console.error(error);
    });
};
