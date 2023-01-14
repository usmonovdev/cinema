import Registration from "./components/registartion/Registration";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home/Home";
import Movies from "./components/movies/Movies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/:moviesId" element={<Movies />}/>
      </Routes>
    </>
  );
}

export default App;