import "./css/App.css";
import Home from "./pages/Home";
import { Router, Route, Routes } from "react-router-dom";
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";
import { MovieProvider } from "./contexts/MovieContexts";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
   <MovieProvider>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorites" element={<Favourites />}></Route>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
  </MovieProvider>
  );
}

export default App;
