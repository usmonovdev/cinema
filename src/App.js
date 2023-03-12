import { Route, Routes } from "react-router-dom";
import { MovieContextProvider } from "./context/MovieContex/MovieContex";
import Home from "./components/main/home/Home";
import MoviesOpen from "./components/main/movies/MoviesOpen";
import Movies from "./components/main/movies/Movies";
import Tvshow from "./components/main/tvshow/Tvshow";
import ShowOpen from "./components/main/tvshow/ShowOpen";
import Actor from "./components/main/actor/Actor";
import ActorOpen from "./components/main/actor/ActorOpen";
import ScrollToTop from "./assets/ScrollToTop";
import Settings from "./components/settings/Settings";
import SignUp from "./components/registartion/SignUp";
import SignIn from "./components/registartion/SignIn";
import ForgotPassword from "./components/registartion/ForgotPassword";
import "./App.css"
import PageNotFound from "./components/PageNotFound";

function App() {
    // SET THEME COLOR USING LOCALSTORAGE
    const root = document.querySelector(":root")
    root.style.setProperty("--yellow",
        window.localStorage.getItem("THEME_COLOR") == null ?
            "#e6b31e" : window.localStorage.getItem("THEME_COLOR"))
    return (
        <>
            <MovieContextProvider>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/reset-password" element={<ForgotPassword />} />
                    <Route path="/movie" element={<Movies />} />
                    <Route path="/movie/:moviesId" element={<MoviesOpen />} />
                    <Route path="/show" element={<Tvshow />} />
                    <Route path="/show/:showId" element={<ShowOpen />} />
                    <Route path="/actor" element={<Actor />} />
                    <Route path="/actor/:actorId" element={<ActorOpen />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </MovieContextProvider>
        </>
    );
}

export default App;