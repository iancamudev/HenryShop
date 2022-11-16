<<<<<<< HEAD
import React, {useState, useEffect} from "react";
import Pagination from "./Pagination";
import ProductCards from "./ProductCards";
import Header from "./Header";
import axios from "axios";

const Home = () => {
  const[googleUser, setGoogleUser] = useState(null);
  const REACT_APP_BACKEND_URL:string = (process.env.REACT_APP_BACKEND_URL as string);

  const getUser = async () => {

    try{
      const url = `${REACT_APP_BACKEND_URL}/googleusers/login/success`;
      const {data} = await axios.get(url, {withCredentials:true});
      setGoogleUser(data.user._json);
    }catch(error:any){
      console.log(error);
    }
  };

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
