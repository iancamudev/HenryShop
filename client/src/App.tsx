import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./componentes/Login";
import Register from "./componentes/Register";
import CreateProduct from "./componentes/CreateProduct";
import Home from "./componentes/Home";
import { DetailProduct } from "./componentes/DetailProduct";
import ProductCards from "./componentes/ProductCards";
import EditProduct from "./componentes/EditProduct";
import AdminPanel from "./componentes/Admin/AdminPanel";

import { useAppSelector, useAppDispatch } from "./hooks";
import getObjectSession from "./funciones/getObjectSession";
import { useEffect } from "react";
import { setData } from "./redux/slices/UserSlice";

function App() {
  const { username } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const session = getObjectSession();
    if (session) {
      dispatch(setData(session));
    }
  }, [dispatch]);

  return (
    <div className="App flex flex-col items-center bg-[#FFFDE7]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Login"
          element={username ? <Navigate to="/" replace={true} /> : <Login />}
        />
        <Route
          path="/Register"
          element={username ? <Navigate to="/" replace={true} /> : <Register />}
        />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/products/:id" element={<DetailProduct />} />
        <Route path="/" element={<ProductCards />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/:id" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default App;
