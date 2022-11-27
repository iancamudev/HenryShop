import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES

export interface ShoppingDetails {
    color: string;
    name: string;
    quantity: number;
    price: number;
    total_Price: number;
    image: string;
    variante: string;
    idShop: string;
}

interface ShoppingState {
  shoppingDetail: ShoppingDetails;
  shoppingList: Array<ShoppingDetails>
}

//Definimos el estado
const initialState: ShoppingState = {
    shoppingList: [],
    shoppingDetail: {
          color: "",
          name: "",
          quantity: 0,
          price: 0,
          total_Price: 0,
          image: "",
          variante: "",
          idShop: "",
  },
};

//PORCION DE ESTADO GLOBAL
const ShoppingSlice = createSlice({
  name: "Shopping",
  initialState,
  reducers: {
    getShoppingList(state, action: PayloadAction<Array<ShoppingDetails>>) {
      state.shoppingList = action.payload;
    },
    getShoppingDetail(state, action: PayloadAction<ShoppingDetails>) {
      state.shoppingDetail = action.payload;
    },
  },
});

export default ShoppingSlice.reducer;
export const {
  getShoppingList,
  getShoppingDetail,
  
} = ShoppingSlice.actions;
