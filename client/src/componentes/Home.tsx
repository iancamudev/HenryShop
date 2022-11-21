import React, { useState, useEffect, lazy } from "react";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import Header from "./Header";
import axios from "axios";
import Filters from "./Filters";

const Home = () => {
  const [googleUser, setGoogleUser] = useState(null);
  const REACT_APP_BACKEND_URL: string = process.env
    .REACT_APP_BACKEND_URL as string;


  const getUser = async () => {
    try {

  const getGoogleUser = async () => {

    try{

      const url = `${REACT_APP_BACKEND_URL}/googleusers/login/success`;
      const { data } = await axios.get(url, { withCredentials: true });
      window.localStorage.setItem(
        "userSession",
        JSON.stringify({ ...data.user, username: data.user.name.split(" ")[0] })
      );
      setGoogleUser(data);
    } catch (error: any) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUser();
  }, []);

  useEffect(()=>{
    getGoogleUser();
  },[]);

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
