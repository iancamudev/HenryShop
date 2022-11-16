import { AppDispatch } from "../../store";
import { IUserState, setData, clearData } from "./index";

export const setUserData = ({ username, token }: IUserState) => (dispatch: AppDispatch) => {
  dispatch(setData({ username, token }))
}

export const clearUserData = () => (dispatch: AppDispatch) => {
  dispatch(clearData())
}