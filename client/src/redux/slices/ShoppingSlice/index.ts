import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES

export interface DateShop {
  id: string;
  createdAt: string;
}

export interface ShoppingDetails {
  id: string;
  color: string;
  name: string;
  quantity: number;
  price: number;
  total_Price: number;
  image: string;
  variante: string;
  idShop: string;
  description: string;
}

interface ShoppingState {
  shoppingDetail: ShoppingDetails;
  shoppingList: Array<ShoppingDetails>;
  dateShop: DateShop;
  shoppingDate: Array<DateShop>
}

//Definimos el estado
const initialState: ShoppingState = {
  shoppingList: [],
  shoppingDetail: {
    id: '',
    color: "",
    name: "",
    quantity: 0,
    price: 0,
    total_Price: 0,
    image: "",
    variante: "",
    idShop: "",
    description: "",
  },
  shoppingDate: [],
  dateShop: {
    id: "",
    createdAt: ""
  }
  
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
    getShoppingDate(state, action: PayloadAction<Array<DateShop>>) {
      state.shoppingDate = action.payload;
    },
    getDateShop(state, action: PayloadAction<DateShop>) {
      state.dateShop = action.payload;
    },
  },
});

export default ShoppingSlice.reducer;
export const {
  getShoppingList,
  getShoppingDetail,
  getShoppingDate,
  getDateShop

} = ShoppingSlice.actions;
