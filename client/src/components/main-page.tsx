import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useUser } from "@/context/userContext";

const MainPage = () => {
  const navigate = useNavigate();
  const {user, isLoading} = useUser();

  if(isLoading) return <p className="text-center font-bold">Loading...</p>

  const onSignUpClick = () => {
    navigate("/sign-up");
  };

  const onLoginClick = () => {
    navigate("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center">
      <p className="text-xl max-w-lg mx-auto font-bold">
        Create votes and share them with world
      </p>
      <p className="text-l max-w-lg mx-auto ">
        No matter what the disputable question is - construct your vote easily
        and send it to people via link.
      </p>
      <p className="text-l max-w-lg mx-auto"></p>
      {(!user || isLoading) && <div className="flex flex-row gap-5">
        <Button onClick={onSignUpClick} className="p-5">
          Sign Up
        </Button>
        <Button onClick={onLoginClick} className="p-5">
          Login
        </Button>
      </div>}
      
    </div>
  );
};

export default MainPage;
