import axios from "axios";
import axiosPostCall from "../../../funciones/axiosPostCall";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { AppDispatch } from "../../store";
import { Filters } from "../FiltersSlice";
import { getUsersList, getUsersPages } from "./index";

export const URL_BACK_DEV: string = process.env.REACT_APP_BACKEND_URL as string;



// export const getAllProducts =
//   (page?: number | null, filters?: Filters) => (dispatch: AppDispatch) => {
//     let url = `${URL_BACK_DEV}/products${page ? `?page=${page}` : "?page="}${
//       filters?.name.length ? `&name=${filters.name}` : "&name="
//     }${
//       filters?.category.length ? `&category=${filters.category}` : "&category="
//     }${
//       filters?.property.length && !filters?.order.length
//         ? `&property=${filters.property}&order=desc`
//         : ""
//     }${
//       filters?.property.length && filters?.order.length
//         ? `&property=${filters.property}&order=${filters.order}`
//         : ""
//     }`;

//     axios
//       .get(url)
//       .then(({ data }) => {
//         dispatch(getProductList(data.docs));
//         dispatch(getProductPages(data.totalPages));
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
export const getAllUsers = (page: number | null) =>  (dispatch: AppDispatch) => {
    let url;
    page ? url = `${URL_BACK_DEV}/users/admin/allusers?page=${page}` : url = `${URL_BACK_DEV}/users/admin/allusers`
    axios.get(url).then(({ data }) => {
        dispatch(getUsersList(data.docs))
        dispatch(getUsersPages(data.totalPages))
    })
}


// export const getProductsById =
//   (id: string | undefined) => (dispatch: AppDispatch) => {
//     axios
//       .get(`${URL_BACK_DEV}/products/${id}`)
//       .then(({ data }) => dispatch(getProductDetail(data)))
//       .catch((error) => {
//         console.error(error);
//       });
//   };
