import { useUser } from "@/context/userContext";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
    const {user, logout} = useUser();

    return(
        <div className="bg-indigo-950 flex flex-row items-center justify-between px-10">
            <Link to="/">
            <p className="ml-5 bg-gradient-to-r from-purple-300 via-indigo-300 to-indigo-700 bg-clip-text text-transparent text-5xl font-extrabold">Vote.me</p>
            </Link>
            {user && <Button onClick={logout}>Logout</Button>}
        </div>
    )
}

export default Header;