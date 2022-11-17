import React, { useEffect } from "react";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import Header from "./Header";

const Home = () => {
  useEffect(() => {
    const logged = window.localStorage.getItem("userSession");
    if (logged) {
      console.log(JSON.parse(logged));
    }
  }, []);
  
  return (
    <>
      <Header />
      <ProductCards />
      <Pagination />
    </>
  );
};

export default Home;
