import "./App.css";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import Pagination from "./componentes/Pagination";
import ProductCards from "./componentes/ProductCards";
import { ProductDetails } from "./redux/slices/ProductSlice";
import { DetailProduct } from "./componentes/DetailProduct";

import {Route, Routes, BrowserRouter } from "react-router-dom"
function App() {
  return (
    
    <div className="App flex flex-col items-center bg-gray-100">
      <Routes>
      <Route path="/products/:id" element={<DetailProduct  />}/>
      <Route path="/" element={<ProductCards />}/>
      
       {/* <Header />
      
      <Pagination />
      <Login /> */}
      </Routes>
    </div>
    
  );
}

export default App;
