import React from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import Filters from "./Filters";
import ProductList from "./Products/ProductList";
import Carrousel from "./carrousel/Carrousel";

const Home = () => {
  return (
    <>
      <Header />
      <Carrousel />
      <Filters />
      <ProductList />
      <Pagination />
    </>
  );
};

export default Home;
