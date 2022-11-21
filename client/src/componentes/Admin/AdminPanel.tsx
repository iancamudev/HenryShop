import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getAllProducts } from "../../redux/slices/ProductSlice/productActions";
import Header from "./Header";
import ProductsPanel from "./ProductsPanel/ProductsPanel";
import UsersPanel from './UsersPanel/UsersPanel'
const AdminPanel = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <ProductsPanel />
    </div>
  );
};

export default AdminPanel;
