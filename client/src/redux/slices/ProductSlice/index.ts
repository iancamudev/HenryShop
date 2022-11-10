import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
export interface ProductDetails {
  id: string;
  name: string;
  rating: number;
  description: string;
  price: number;
  image: string;
  stock: number;
  category: string;
  colors: Array<string>;
  sizes: Array<string>;
}

interface ProductState {
  productList: Array<ProductDetails>;
  productDetail: ProductDetails | {};
  productPages: Number;
}

//Definimos el estado
const initialState: ProductState = {
  productList: [],
  productDetail: {},
  productPages: 0,
};

//PORCION DE ESTADO GLOBAL
const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    getProductList(state, action: PayloadAction<Array<ProductDetails>>) {
      state.productList = action.payload;
    },
    getProductPages(state, action: PayloadAction<Number>) {
      state.productPages = action.payload;
    },
  },
});

export default ProductSlice.reducer;
export const { getProductList, getProductPages } = ProductSlice.actions;
