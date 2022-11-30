import axios from "axios";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import {
  getShoppingList,
  getShoppingDetail,
  getShoppingDate,
  getDateShop
} from "./index";

export const URL_BACK_DEV: string = process.env.REACT_APP_BACKEND_URL as string;

export const getAllShoppingByUser = (query: string | undefined, origin: string | undefined) =>  (dispatch: AppDispatch) => {
    let url;
    url = `${URL_BACK_DEV}/users/shopping?query=${query}&origin=${origin}`
    axios.get(url).then(({ data }) => {
        dispatch(getShoppingList(data));
        dispatch(getShoppingDetail(data));
    })
};

export const getDateShopping = (query: string | undefined, origin : string | undefined) =>  (dispatch: AppDispatch) => {
  let url;
  url = `${URL_BACK_DEV}/users/shopdate?query=${query}&origin=${origin}`
  axios.get(url).then(({ data }) => {
      dispatch(getShoppingDate(data))
      dispatch(getDateShop(data))
  })
};
