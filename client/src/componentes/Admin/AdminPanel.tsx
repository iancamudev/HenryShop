import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getAllProducts } from "../../redux/slices/ProductSlice/productActions";
import Header from "./Header";
import MenuPanel from "./MenuPanel";
import ProductsPanel from "./ProductsPanel/ProductsPanel";
import UsersPanel from './UsersPanel/UsersPanel'
const AdminPanel = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center xl:items-stretch">
      <Header />
      <div className="xl:flex xl:flex-row xl-flex-start xl:items-start xl:gap-x-12">
      <MenuPanel />
      <ProductsPanel />
      </div>
    </div>
  );
};

export default AdminPanel;
