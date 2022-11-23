import React, { useEffect } from "react";
import { useAppDispatch } from "../../hooks";
import { getAllProducts } from "../../redux/slices/ProductSlice/productActions";
import Header from "./Header";
import PaymentsPanel from "./PaymentsPanel/PaymentsPanel";
const AdminPanelPayments = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center">
      <Header />
      <PaymentsPanel />
    </div>
  );
};

export default AdminPanelPayments;
