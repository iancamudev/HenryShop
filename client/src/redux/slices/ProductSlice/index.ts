import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
interface ProductDetails {
  id: String;
  name: String;
  rating: Number;
  description: String;
  price: Number;
  image: String;
  stock: Number;
  category: String;
  colors: Array<string>;
  sizes: Array<string>;
}

interface ProductState {
  productList: Array<ProductDetails>;
  productDetail: ProductDetails | {};
}

//Definimos el estado
const initialState: ProductState = {
  productList: [],
  productDetail: {},
};

//PORCION DE ESTADO GLOBAL
const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    getProductList(state, action: PayloadAction<Array<ProductDetails>>) {
      state.productList = action.payload;
    },
  },
});

export default ProductSlice.reducer;
export const { getProductList } = ProductSlice.actions;
