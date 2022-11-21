import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
export interface AdminUserDetail {
    confirmed: boolean;
    isAdmin: boolean;
    name: string;
    email: string;
    username:string;
    password: string;
    birthday: string;
    deleted: boolean;
    id: string;
  }
  
  interface AdminUserState {
    usersList: Array<AdminUserDetail>;
    userDetail: AdminUserDetail;
    userPages: Number;
  }
//Definimos el estado
const initialState: AdminUserState = {
  usersList: [],
  userDetail: {
    confirmed: false,
    isAdmin: false,
    name: "",
    email: "",
    username: "",
    password: "",
    birthday: "",
    deleted: false,
    id: ""
  },
  userPages: 0,
};

//PORCION DE ESTADO GLOBAL
const AdminSlice = createSlice({
  name: "Users",
  initialState,
  reducers: {
    // getProductList(state, action: PayloadAction<Array<UserDetail>>) {
    //   state.productList = action.payload;
    // },
    getUsersList(state, action: PayloadAction<Array<AdminUserDetail>>){
      state.usersList = action.payload;
    },
    getUsersPages(state, action: PayloadAction<Number>){
       state.userPages = action.payload;
    }
  },
});

export default AdminSlice.reducer;
export const { getUsersList, getUsersPages} =
  AdminSlice.actions;
