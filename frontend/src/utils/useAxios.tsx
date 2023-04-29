import dayjs from "dayjs";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const baseURL = "http://127.0.0.1:8000/api";
interface User {
  username: string;
  email: string;
  exp: number;
}
const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logout } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const controller = new AbortController();
    if (req.withCredentials == false) return req;
    if (!localStorage.getItem("authTokens")) {
      logout();
      controller.abort();
      return { ...req, signal: controller.signal };
    }
    const user: User = jwt_decode(JSON.parse(localStorage.getItem("authTokens")!).access);
    const isExpired = dayjs.unix(user!.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("authTokens")!).access}`;
      return req;
    }

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: JSON.parse(localStorage.getItem("authTokens")!).refresh,
    });
    localStorage.setItem("authTokens", JSON.stringify(response.data));
    setAuthTokens(response.data);
    setUser(jwt_decode(response.data.access));
    req.headers.Authorization = `Bearer ${response.data.access}`;
    if (req.data.token) req.data.token = response.data.access;
    return req;
  });
  return axiosInstance;
};

export default useAxios;
