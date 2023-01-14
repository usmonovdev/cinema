import Registration from "./components/registartion/Registration";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home/Home";
import MoviesOpen from "./components/main/movies/MoviesOpen";
import Movies from "./components/main/movies/Movies";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/register" element={<Registration />}/>
        <Route path="/movies" element={<Movies />}/>
        <Route path="/movies/:moviesId" element={<MoviesOpen />}/>
      </Routes>
    </>
  );
}

export default App;