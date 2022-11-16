import { AppDispatch } from "../../store";
import { getAllProducts } from "../ProductSlice/productActions";
import { setFilters } from "./index";
import { Filters } from "./index";

export const setFiltersAction = (obj: Filters) => (dispatch: AppDispatch) => {
  dispatch(setFilters(obj));
  dispatch(getAllProducts(null, obj));
};
