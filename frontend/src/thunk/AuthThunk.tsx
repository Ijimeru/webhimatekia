import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthTokensType, AuthTypes } from "../type/AuthType";
import useAxios from "../utils/useAxios";
import axios from "axios";
// const axios = ax;
const logout = createAsyncThunk<void, void, { state: AuthTypes }>("auth/logout", async (_, { getState }) => {
  const state = getState();
  axios.post("/token/blacklist/", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: state.authTokens?.refresh }),
  });

  localStorage.removeItem("authTokens");
});

const login = createAsyncThunk<AuthTokensType, { email: string; password: string }, { state: AuthTypes }>("auth/login", async (arg, { getState }) => {
  const { email, password } = arg;
  const response = await axios.post("/token/", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response.data as AuthTokensType;
});

export { login, logout };
