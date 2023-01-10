import Registration from "./components/registartion/Registration";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Home from "./components/main/home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </>
  );
}

export default App;