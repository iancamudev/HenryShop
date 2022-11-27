import axios from "axios";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import {
  getShoppingList,
  getShoppingDetail,
} from "./index";

export const URL_BACK_DEV: string = process.env.REACT_APP_BACKEND_URL as string;

export const getAllShoppingByUser = (username: string | undefined) =>  (dispatch: AppDispatch) => {
    let url;
    url = `${URL_BACK_DEV}/users/shopping/${username}`
    axios.get(url).then(({ data }) => {
        dispatch(getShoppingList(data))
        dispatch(getShoppingDetail(data))
    })
};
