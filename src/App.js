import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Registration from "./components/registartion/Registration";
import "./App.css"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Registration />}/>
        <Route path="/" element={<Navbar />}/>
      </Routes>
    </>
  );
}

export default App;