// here goes the store
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../redux/slices/ProductSlice/index";
import FiltersSlice from "./slices/FiltersSlice";
import UserSlice from "./slices/UserSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice,
    filterState: FiltersSlice,
    user: UserSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
