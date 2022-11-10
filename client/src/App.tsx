import "./App.css";
import Login from "./componentes/Login";
import Register from "./componentes/Register";

function App() {
  return (
    <div className="App flex flex-col items-center bg-gray-100">
      <Login />
      <Register />
    </div>
  );
}

export default App;
