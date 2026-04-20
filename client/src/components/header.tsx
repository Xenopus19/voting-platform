import { useUser } from "@/context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
    const navigate = useNavigate();
  const { user, logout } = useUser();

  const goToUserPage = () => {
    if(user)
        navigate('user-page');
  }

  return (
    <div className="bg-indigo-950 flex flex-row items-center justify-between px-10">
      <Link to="/">
        <p className="ml-5 bg-gradient-to-r from-purple-300 via-indigo-300 to-indigo-700 bg-clip-text text-transparent text-5xl font-extrabold">
          Vote.me
        </p>
      </Link>
      {user && (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={goToUserPage}>My Page</Button>
          <Button variant="secondary" onClick={logout}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default Header;
