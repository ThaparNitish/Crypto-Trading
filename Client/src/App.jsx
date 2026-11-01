import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/global/Navbar.jsx";
import CoinDetails from "./pages/CoinDetails.jsx";

function App(){
  return(
    <div className="min-h-screen bg-neutral-900 text-gray-300">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/coins/:name" element={<CoinDetails />} />
      </Routes>
    </div>

    )
}

export default App;