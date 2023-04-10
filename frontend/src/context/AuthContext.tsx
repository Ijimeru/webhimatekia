import React, { createContext, useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: (username: string, password: string) => {},
  logout: () => {},
});
interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>({ username: "habibi", email: "habibiunyila@gmail.com" });

  const login = (username: string, password: string) => {
    // melakukan validasi username dan password
    // ...
    // jika validasi berhasil, set user
    setUser({ username, email: "example@example.com" });
  };

  const logout = () => {
    // logout user dengan menghapus data dari state
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
