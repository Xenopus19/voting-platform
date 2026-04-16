import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/util/api"; 
import type { User } from "@/types";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  logout: () => void;
  checkUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("token empty")
        setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/users/me");
        setUser(response.data);
      } catch (error) {
        console.error("User check error", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, logout, checkUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};