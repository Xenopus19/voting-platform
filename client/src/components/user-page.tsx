import { useUser } from "@/context/userContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  const { user, checkUser, isLoading } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  if(!isLoading && !user)
  {
    navigate('/')
  }
  return <p className="font-bold text-xl">{user?.username}</p>;
};

export default UserPage;
