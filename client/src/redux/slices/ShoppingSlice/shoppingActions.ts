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

export const getAllShoppingByUser = (username: string | undefined, origin: string | undefined) =>  (dispatch: AppDispatch) => {
    let url;
    url = `${URL_BACK_DEV}/users/shopping?username=${username}&origin=${origin}`
    axios.get(url).then(({ data }) => {
        dispatch(getShoppingList(data));
        dispatch(getShoppingDetail(data));
    })
};

export const getDateShopping = (username: string | undefined, origin : string | undefined) =>  (dispatch: AppDispatch) => {
  let url;
  url = `${URL_BACK_DEV}/users/shopdate?username=${username}&origin=${origin}`
  axios.get(url).then(({ data }) => {
      dispatch(getShoppingDate(data))
      dispatch(getDateShop(data))
  })
};
