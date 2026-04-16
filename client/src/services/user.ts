import type { LoginInfoType } from "@/components/login/login-form";
import type { SignUpInfoType } from "@/components/sign-up/sign-up-form";
import api from "@/util/api";

export const signUp = async (signUpInfo: SignUpInfoType) => {
    try{
        const response = await api.post("/users", { username: signUpInfo.username, password: signUpInfo.password });
        return response.data;
    }
    catch(error){
        console.error("Error signing up:", error);
        throw error;
    }
}

export const login = async (loginInfo: LoginInfoType) => {
    try{
        const response = await api.post("/login", { username: loginInfo.username, password: loginInfo.password });
        localStorage.setItem("token", response.data.token);
        return response.data;
    }
    catch(error){
        console.error("Error login:", error);
        throw error;
    }
}