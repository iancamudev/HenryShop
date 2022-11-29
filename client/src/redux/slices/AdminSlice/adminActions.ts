import axios from "axios";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import { setError, setLoading } from "../ProductSlice";
import { getUsersList, getUsersPages, getPayments, getPaymentsPages, setFiltersUsers, clearUsersList, getPaymentDetail, setFiltersPayment, FiltersPayment, getClearPayments } from "./index";

export const URL_BACK_DEV: string = process.env.REACT_APP_BACKEND_URL as string;




export const getAllUsers = (page?: number | null, filters?: any) =>  (dispatch: AppDispatch) => {
    
    dispatch(setLoading(true));
    dispatch(clearUsersList());
    let url = `${URL_BACK_DEV}/users/admin/allusers?page=${page}&username=${filters?.username}&property=name&order=${filters?.order}`;

    axios
      .get(url)
      .then(({ data }) => {
        dispatch(getUsersList(data.docs));
        dispatch(getUsersPages(data.totalPages));
      })
      .catch((error) => {
        console.error(error);
        dispatch(
          setError("Hubo un error cargando los productos. Recargue la página")
        );
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
}

export const setFiltersActionUsers = ( page:Number, obj: any) => (dispatch: AppDispatch) => {
    dispatch(setFiltersUsers(obj));
    dispatch(getUsersPages(page));
    dispatch(getAllUsers(null, obj));
    
  };

export const getAllPayments = (page: Number, filters?: FiltersPayment | null) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  dispatch(getClearPayments());
  let url: string = `${URL_BACK_DEV}/shop/adminusers?page=${page}&id=${filters?.id_compra}`;
  
    axios.get(url).then(({ data }) => {
        dispatch(getPayments(data.docs));
        dispatch(getPaymentsPages(data.totalPages));
        console.log("adios", data.docs);
    })

};

export const setFiltersActionPayment = ( page: number, obj: any) => (dispatch: AppDispatch) => {
  dispatch(setFiltersPayment(obj));
  dispatch(getAllPayments(page, obj?.id_compra));
  dispatch(getPaymentsPages(page));
  
  
};

export const getUserByUsername = (username: string | undefined) =>  (dispatch: AppDispatch) => {
    let url;
    url = `${URL_BACK_DEV}/users/admin/${username}`
    axios.get(url).then(({ data }) => {
        dispatch(getUsersList(data))
    })
};
export const getPaymentById = (id: string | undefined) => (dispatch: AppDispatch) => {
  let url;
  url = `${URL_BACK_DEV}/shop/${id}`
  axios.get(url).then(({ data }) => {
      dispatch(getPaymentDetail(data))
      console.log( data )
  })
}

