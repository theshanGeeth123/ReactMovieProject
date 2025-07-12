import "./css/App.css";
import Home from "./pages/Home";
import {Router,Route, Routes} from 'react-router-dom'
import Favourites from "./pages/Favourites";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div>
      <NavBar/>
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/favorites" element={<Favourites/>}></Route>
      </Routes>
    </main>
    </div>
  );
}

export default App;
