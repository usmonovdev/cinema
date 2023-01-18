import Registration from "./components/registartion/Registration";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home/Home";
import MoviesOpen from "./components/main/movies/MoviesOpen";
import Movies from "./components/main/movies/Movies";
import Navbar from "./components/navbar/Navbar";
import { MovieContextProvider } from "./context/MovieContex/MovieContex";
import Trending from "./components/main/trending/Trending";
import Posts from "./Posts";

function App() {
  return (
    <>
      <MovieContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:moviesId" element={<MoviesOpen />} />
        </Routes>
      </MovieContextProvider>
      {/* <Posts /> */}
    </>
  );
}

export default App;