import { createSlice, PayloadAction } from "@reduxjs/toolkit";


//INTERFACES
export interface PaymentProductDetails {
  quantity: number;
  id: string;
  name: string;
  rating: number;
  description: string;
  price: Array<number>;
  total_Price: number;
  image: string;
  category: string;
  variante: string;
}
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
    shopping: Array<object>
  }
export interface Payments {
  userId: string;
  products: Array<PaymentProductDetails>;
  id: string;
}
interface PaymentDetail {
  userId: string;
  products: Array<PaymentProductDetails>;
  createdAt: string;
  updatedAt: string;
  id: string;
}
  interface AdminUserState {
    usersList: Array<AdminUserDetail>;
    userDetail: AdminUserDetail;
    userPages: Number;
    payments: Array<Payments>;
    paymentdetail: PaymentDetail;
    paymentsPages: Number;
    filters: Object;
    error: string;
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
    id: "",
    shopping: [],
  },
  userPages: 0,
  payments: [],
  paymentdetail: { userId: "", products: [], createdAt: "", updatedAt: "", id:""},
  paymentsPages: 0,
  filters: {
    username: "",
    property: "",
    order: "",
  },
  error: "",
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
    clearUsersList(state) {
      state.error = "";
      state.usersList = [];
    },
    getUsersPages(state, action: PayloadAction<Number>){
       state.userPages = action.payload;
    },
    getPayments(state, action: PayloadAction<Array<Payments>>){
      state.payments = action.payload
    },
    getPaymentsPages(state, action: PayloadAction<Number>){
      state.paymentsPages = action.payload;
   },
   setFiltersUsers(state, action: PayloadAction<Object>) {
    state.filters = action.payload;
  },
   getPaymentDetail(state, action: PayloadAction<PaymentDetail>){
    state.paymentdetail = action.payload;
 },
  },
});

export default AdminSlice.reducer;
export const { getPaymentDetail, getUsersList, getUsersPages, getPayments,setFiltersUsers, getPaymentsPages, clearUsersList} =
  AdminSlice.actions;
