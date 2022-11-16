import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getAllProducts } from "../../redux/slices/ProductSlice/productActions";
import Header from "./Header";
import Panel from "./Panel";

const AdminPanel = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Panel />
    </div>
  );
};

export default AdminPanel;
