import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import useAxios from "../utils/useAxios";
import { toast, Slide } from "react-toastify";
import { AuthContextType, AuthTokensType, User } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  authTokens: null,
  setUser: () => {},
  setAuthTokens: () => {},
  login: (email: string, password: string) => {},
  logout: () => {},
  setResendEmail: () => {},
  resendEmail: "",
});
interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => (localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")!) : null));
  const [authTokens, setAuthTokens] = useState<AuthTokensType | null>(() => (localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")!) : null));
  const [resendEmail, setResendEmail] = useState<string>("");

  // Fungsi Login
  const login = (email: string, password: string) => {
    const response = new Promise((resolve, rejected) =>
      fetch("/api/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
          if (res.status === 200) {
            resolve("Anda berhasil login");
            return res.json();
          } else {
            rejected(res.status);
            return;
          }
        })
        .then((data) => {
          if (data?.access) {
            setResendEmail("");
            setAuthTokens(data);
            localStorage.setItem("authTokens", JSON.stringify(data));
            setUser(jwt_decode(data.access));
            navigate("/dashboard");
          }
        })
    );

    toast.promise(response, {
      pending: {
        render() {
          return "Sedang login...";
        },
      },
      success: {
        render({ data }) {
          return `${data}`;
        },
        icon: "🟢",
      },
      error: {
        render({ data }) {
          if (data == 401) {
            setResendEmail("");
            return "Email atau password anda salah";
          } else {
            setResendEmail(email);
            return "Maaf, email anda belum terverifikasi";
          }
        },
      },
    });
  };

  const logout = () => {
    // logout user dengan menghapus data dari state
    if (!localStorage.getItem("authTokens")) {
      toast.warning("Anda belum login");
      navigate("/login");
      return;
    }
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
    navigate("/login");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        authTokens,
        setUser,
        login,
        setAuthTokens,
        logout,
        resendEmail,
        setResendEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
