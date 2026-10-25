import { Link } from "react-router-dom";

function Navbar(){
    return(
        <div className="flex w-full items-center justify-between pl-10 py-2">
            <Link to = "/">
                <p className="text-2xl font-bold">Crypto Trading</p>
            </Link>
            <div className="flex items-center gap-1 pr-4 text-xl">
                <Link to = "/" className="hidden md:inline-block">
                    <p className="text-hover">Home</p>
                </Link>
                <p onClick={() => {console.log("search")}} className="text-hover">Search</p>
                <Link to="/coins"><p className="hover:text-white hover:bg-neutral-800 px-2 py-1 rounded-md">Browse</p></Link>
            </div>
        </div>
    )
}

export default Navbar;