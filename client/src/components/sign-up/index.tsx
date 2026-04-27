import { login, signUp } from "@/services/user";
import SignUpForm, { type SignUpInfoType } from "./sign-up-form";
import { useNavigate } from "react-router-dom";
import { useMessage } from "@/context/errorContext";

const SignUp = () => {
  const {setError} = useMessage();
  const navigate = useNavigate();
  const onSubmit = async (data: SignUpInfoType) => {
    try {
      const response = await signUp(data);

      if (!response.id) return;

      const loginResponse = await login({
        password: data.password,
        username: data.username,
      });
      if (!loginResponse.token) return;

      navigate("/user-page");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-bold text-xl m-5">Sign Up</p>
      <SignUpForm onSubmit={onSubmit} />
    </div>
  );
};

export default SignUp;
