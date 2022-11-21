import axiosGetCall from "../../../funciones/axiosGetCall";
import { AppDispatch } from "../../store";
import { IUserState, setData, clearData } from "./index";

export const setUserData = () => (dispatch: AppDispatch) => {
  axiosGetCall("/users/getUserByToken").then((response) =>
    dispatch(setData(response.data))
  );
};

export const clearUserData = () => (dispatch: AppDispatch) => {
  dispatch(clearData());
};
