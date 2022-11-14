import axios from "axios";
import { AppDispatch } from "../../store";
import { getProductPages } from "../ProductSlice";
import { getAllProducts } from "../ProductSlice/productActions";
import { setFilters } from "./index";
import { Filters } from "./index";
const BACKEND_URL =
  process.env.REACT_APP_BACKEND_URL || "https://localhost:3001";

export const setFiltersAction = (obj: Filters) => (dispatch: AppDispatch) => {
  dispatch(setFilters(obj));
  dispatch(getAllProducts(null, obj));
};
