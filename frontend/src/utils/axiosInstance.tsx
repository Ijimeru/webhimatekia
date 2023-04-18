import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000";

interface AuthTokensType {
  access: string;
  refresh: string;
}

let authTokens: AuthTokensType | null = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")!) : null;

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${authTokens?.access}` },
});

interface User {
  username: string;
  email: string;
  exp: number;
}

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")!) : null;
    req.headers.Authorization = `Bearer ${authTokens?.access}`;
  }
  const user: User | null = jwt_decode(authTokens!.access);
  const isExpired = dayjs.unix(user!.exp).diff(dayjs()) < 1;
  if (!isExpired) return req;

  const response = await axios.post(`${baseURL}/api/token/refresh`, {
    refresh: authTokens?.refresh,
  });
  localStorage.setItem("authTokens", JSON.stringify(response.data));
  req.headers.Authorization = `Bearer ${authTokens?.access}`;
  return req;
});
export default axiosInstance;
