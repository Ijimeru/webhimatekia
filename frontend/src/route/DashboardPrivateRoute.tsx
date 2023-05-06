import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAxios from "../hook/useAxios";
import { AuthTokensType } from "../types/AuthTypes";

interface props {
  component: React.ReactNode;
}

const DashboardPrivateRoute: React.FC<props> = ({ component }) => {
  const navigate = useNavigate();
  const axios = useAxios();
  const authTokens: AuthTokensType = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")!) : null;
  React.useEffect(() => {
    checkToken();
  }, []);
  async function checkToken() {
    const res = await axios.post("/token/verify/", { token: authTokens?.access });
    if (res.status == 400) {
      toast.warning("Token anda sudah kaldaluarsa");
      navigate("/login");
    }
  }
  return <>{component}</>;
};

export default DashboardPrivateRoute;
