import { createSlice, PayloadAction } from "@reduxjs/toolkit";

//INTERFACES
interface category {
  id: string;
  name: string;
};

export interface variant {
  quantity: number;
  value: string;
}

export interface IReview {
  review: {
    id: string;
    rating: number;
    text: string;
    user: {
      username: string;
    }
  }
}

export interface ProductDetails {
  deleted: any;
  id: string;
  name: string;
  rating: number;
  description: string;
  price: Array<number>;
  image: string;
  stock: number;
  category: string;
  variants:Array<variant>;
  variantName: string;
  reviews: Array<IReview>;
}

interface ProductState {
  productList: Array<ProductDetails>;
  productDetail: ProductDetails;
  carrouselList: Array<Object>;
  carrouselLoading: boolean;
  productPages: Number;
  loading: boolean;
  error: string;
  categoryList: Array<category>;
  productListAdmin: Array<ProductDetails>
}

//Definimos el estado
const initialState: ProductState = {
  productList: [],
  carrouselList: [],
  carrouselLoading: false,
  categoryList: [{id: "", name: ""}],
  productListAdmin:[],
  productDetail: {
    id: "",
    name: "",
    rating: -1,
    description: "",
    price: [],
    image: "",
    stock: 0,
    category: "",
    variants:[],
    variantName:"",
    reviews: [],
    deleted: false,
  },
  productPages: 0,

  loading: false,
  error: "",
};
//PORCION DE ESTADO GLOBAL
const ProductSlice = createSlice({
  name: "Products",
  initialState,
  reducers: {
    getProductList(state, action: PayloadAction<Array<ProductDetails>>) {
      state.productList = action.payload;
    },
    getProductAdminList(state, action: PayloadAction<Array<ProductDetails>>) {
      state.productListAdmin = action.payload;
    },
    getProductPages(state, action: PayloadAction<Number>) {
      state.productPages = action.payload;
    },
    getProductDetail(state, action: PayloadAction<ProductDetails>) {
      state.productDetail = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearProductLsit(state) {
      state.error = "";
      state.productList = [];
    },clearProductDetail(state) {
      state.error = "";
      state.productDetail = {
        id: "",
        name: "",
        rating: -1,
        description: "",
        price: [],
        image: "",
        stock: 0,
        category: "",
        variants:[],
        variantName:"",
        reviews: [],
      };
    },
    clearProductAdminList(state) {
      state.error = "";
      state.productListAdmin = [];
    },
    getBestOffersList(state, action: PayloadAction<Array<Object>>) {
      state.carrouselList = action.payload;
    },
    setCarrouselLoading(state, action: PayloadAction<boolean>) {
      state.carrouselLoading = action.payload;
    },
    getCategoryList(state, action: PayloadAction<Array<category>>){
      state.categoryList = action.payload;
    }
  },
});

export default ProductSlice.reducer;
export const {
  getProductList,
  getProductPages,
  getProductDetail,
  setLoading,
  setError,
  clearProductLsit,
  getBestOffersList,
  getCategoryList,
  getProductAdminList,
  clearProductAdminList,
  setCarrouselLoading,
  clearProductDetail
} = ProductSlice.actions;
