import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email: string;
}
interface AuthTokensType {
  access: string;
  refresh: string;
}
interface MessageType {
  status: string;
  message: string;
}
interface AuthContextType {
  user: User | null;
  authTokens: AuthTokensType | null;
  loginMessage: MessageType | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authTokens: null,
  loginMessage: null,
  login: (email: string, password: string) => {},
  logout: () => {},
});
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => (localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")!) : null));
  const [authTokens, setAuthTokens] = useState<AuthTokensType | null>(() => (localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")!) : null));
  const [loginMessage, setLoginMessage] = useState<{ status: string; message: string } | null>(null);

  // Fungsi Login
  const login = async (email: string, password: string): Promise<string | void> => {
    const response = await fetch("/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      localStorage.setItem("authTokens", JSON.stringify(data));
      setLoginMessage({ status: "berhasil", message: "Anda berhasil login" });
      setTimeout(() => {
        setUser(jwt_decode(data.access));
        setLoginMessage(null);
        navigate("/");
      }, 3000);
    } else if (response.status === 401) {
      setLoginMessage({ status: "gagal", message: "Anda gagal login" });
    } else if (response.status === 400) {
      setLoginMessage({ status: "belum terverifikasi", message: data.non_field_errors[0] });
    }
  };

  const logout = async () => {
    // logout user dengan menghapus data dari state
    fetch("/api/token/blacklist/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        loginMessage,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
