// context/AuthContext.tsx
"use client";

import { authEvents } from "@/api/fecthWithAuth";
import SessionExpired from "@/components/sessionExpired/sessionExpired";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    const handleUnauthorized = () => {
      setSessionExpired(true);
      logout();
    };

    authEvents.on("unauthorized", handleUnauthorized);

    return () => {
      authEvents.off("unauthorized", handleUnauthorized);
    };

  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      {sessionExpired ? (
        <SessionExpired setSessionExpired={setSessionExpired}></SessionExpired>
      ) : <></>}

    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");

  return context;
};
