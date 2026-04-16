import { login } from "@/services/user";
import LoginForm, { type LoginInfoType } from "./login-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
    const onSubmit = async (data: LoginInfoType) => {
      const response = await login(data);
      if(response.token)
      {
        navigate('/user-page')
      }
    }
    
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-bold text-xl m-5">Login</p>
      <LoginForm onSubmit={onSubmit}/>
    </div>
  );
};

export default Login;
