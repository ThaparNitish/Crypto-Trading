import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/global/Navbar.jsx";
import Coins from "./pages/Coins.jsx";

function App(){
  return(
    <div className="min-h-screen bg-neutral-900 text-gray-300">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="coins" element={<Coins/>}/>
      </Routes>
    </div>

    )
}

export default App;