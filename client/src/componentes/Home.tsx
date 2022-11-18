import React, { useEffect } from "react";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import Header from "./Header";
import Filters from "./Filters";

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
      <Filters />
      <ProductCards />
      <Pagination />
    </>
  );
};

export default Home;
