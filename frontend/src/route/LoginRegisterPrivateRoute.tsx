import React from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface props {
  component: React.ReactNode;
}

const LoginRegisterPrivateRoute: React.FC<props> = ({ component }) => {
  let { user } = React.useContext(AuthContext);
  if (user) {
    toast.warning("Anda sudah login, tidak perlu login/registrasi lagi");
    return <Navigate to="/dashboard" />;
  } else {
    return <>{component}</>;
  }
};

export default LoginRegisterPrivateRoute;
