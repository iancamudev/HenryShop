// here goes the store
import { configureStore } from "@reduxjs/toolkit";
import ProductSlice from "../redux/slices/ProductSlice/index";

const store = configureStore({
  reducer: {
    products: ProductSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
