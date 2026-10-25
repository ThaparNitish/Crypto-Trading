import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";

function App(){
  return(
    <div className="min-h-screen bg-neutral-900 text-gray-300">
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </div>

    )
}

export default App;