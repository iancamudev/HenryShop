import React, { useState, useEffect, lazy } from "react";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import Header from "./Header";
import axios from "axios";
import Filters from "./Filters";

const Home = () => {

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
