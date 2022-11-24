import React from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import Filters from "./Filters";
import ProductList from "./Products/ProductList";
import Carrousel from "./carrousel/Carrousel"

const Home = () => {

  return (
    <>
      <Header />
      <Filters />
      <Carrousel/>
      <ProductList />
      <Pagination />
    </>
  );
};

export default Home;
