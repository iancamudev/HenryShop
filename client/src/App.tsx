import "./App.css";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import ProductCards from "./componentes/ProductCards";

function App() {
  return (
    <div className="App">
      <Header />
      <ProductCards />
      <Login />
    </div>
  );
}

export default App;
