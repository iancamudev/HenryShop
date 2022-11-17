import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import CreateProduct from "./componentes/CreateProduct";
import Home from "./componentes/Home";
import { DetailProduct } from "./componentes/DetailProduct";
import ProductCards from "./componentes/ProductCards";
import EditProduct from "./componentes/EditProduct";
import AdminPanel from "./componentes/Admin/AdminPanel";
import { ShoppingCartProvider } from "./componentes/ShoppingCart/ContextShoppingCart";
function App() {
  return (
    <ShoppingCartProvider>
    <div className="App flex flex-col items-center bg-[#FFFDE7]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Createproduct" element={<CreateProduct />} />
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="/" element={<ProductCards />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/:id" element={<EditProduct />} />
      </Routes>
    </div>
    </ShoppingCartProvider>
  );
}

export default App;
