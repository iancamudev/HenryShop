import React from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import Filters from "./Filters";
import ProductList from "./Products/ProductList";
import Carrousel from "./carrousel/Carrousel";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Carrousel />
      <Filters />
      <ProductList />
      <Pagination />
      <Footer />
    </>
  );
};

export default Home;
