// here goes the store
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../redux/slices/ProductSlice/index";
import AdminSlice from "./slices/AdminSlice";
import FiltersSlice from "./slices/FiltersSlice";
import UserSlice from "./slices/UserSlice";
import ShoppingSlice from "./slices/ShoppingSlice";

const store = configureStore({
  reducer: {
    products: ProductSlice,
    filterState: FiltersSlice,
    user: UserSlice,
    admin: AdminSlice,
    shopping: ShoppingSlice
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
