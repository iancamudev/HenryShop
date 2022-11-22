import React from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import Filters from "./Filters";
import ProductList from "./Products/ProductList";

const Home = () => {

  return (
    <>
      <Header />
      <Filters />
      <ProductList />
      <Pagination />
    </>
  );
};

export default Home;
