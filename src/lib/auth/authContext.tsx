// context/AuthContext.tsx
"use client";

import { authEvents } from "@/api/fetchWithAuth";
import SessionExpired from "@/components/sessionExpired/sessionExpired";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";


interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  role: string;
}

export const obtainRoleFromToken = (token: string) => {
  const parts = token.split('.');
  if (parts.length === 3) {
    const payload = atob(parts[1]);
    const payloadObject = JSON.parse(payload);
    return payloadObject.role;
  }
  return null
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sessionExpired, setSessionExpired] = useState<boolean>(false);
  const [accountRole, setAccountRole] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        const roleToken = obtainRoleFromToken(token);
        if (roleToken != null && roleToken.length > 0) {
          setIsAuthenticated(true);
          setAccountRole(roleToken);
        }
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
    }
  }, []);

  const login = (token: string) => {
    const roleToken = obtainRoleFromToken(token);
    if (roleToken != null && roleToken.length > 0) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      setAccountRole(roleToken);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setAccountRole("");
  };

  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    isLoading,
    role: accountRole,
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
