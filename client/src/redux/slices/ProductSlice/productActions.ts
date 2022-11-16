import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import { getProductList, getProductPages, getProductDetail } from "./index";

export const BACKEND_URL = "http://localhost:3001";
export const URL_BACK_DEV = "http://localhost:3001"

export const getAllProducts =
  (page?: number | null, filters?: Filters) => (dispatch: AppDispatch) => {
    let url = `${URL_BACK_DEV}/products${page ? `?page=${page}` : "?page="}${
      filters?.name.length ? `&name=${filters.name}` : "&name="
    }${
      filters?.category.length ? `&category=${filters.category}` : "&category="
    }${
      filters?.property.length && !filters?.order.length
        ? `&property=${filters.property}&order=desc`
        : ""
    }${
      filters?.property.length && filters?.order.length
        ? `&property=${filters.property}&order=${filters.order}`
        : ""
    }`;

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

export const getProductsById =
  (id: string | undefined) => (dispatch: AppDispatch) => {
    axios
      .get(`${URL_BACK_DEV}/products/${id}`)
      .then(({ data }) => dispatch(getProductDetail(data)))
      .catch((error) => {
        console.error(error);
      });
  };
