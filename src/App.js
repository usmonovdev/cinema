import Registration from "./components/registartion/Registration";
import "./App.css"
import { Route, Routes } from "react-router-dom";
import Home from "./components/main/home/Home";
import MoviesOpen from "./components/main/movies/MoviesOpen";
import Movies from "./components/main/movies/Movies";
import { MovieContextProvider } from "./context/MovieContex/MovieContex";
import Tvshow from "./components/main/tvshow/Tvshow";
import ShowOpen from "./components/main/tvshow/ShowOpen";
import { StateContextProvider } from "./context/StateContext/StateContext";
import Actor from "./components/main/actor/Actor";
import ActorOpen from "./components/main/actor/ActorOpen";
import ScrollToTop from "./assets/ScrollToTop";
import Settings from "./components/settings/Settings";

function App() {
    const root = document.querySelector(":root")
    root.style.setProperty("--yellow", window.localStorage.getItem("THEME_COLOR") == null ? "#e6b31e" : window.localStorage.getItem("THEME_COLOR"))
    return (
        <>
            <StateContextProvider>
                <MovieContextProvider>
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/movie" element={<Movies />} />
                        <Route path="/movie/:moviesId" element={<MoviesOpen />} />
                        <Route path="/show" element={<Tvshow />} />
                        <Route path="/show/:showId" element={<ShowOpen />} />
                        <Route path="/actor" element={<Actor />} />
                        <Route path="/actor/:actorId" element={<ActorOpen />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>
                </MovieContextProvider>
            </StateContextProvider>
        </>
    );
}

export default App;