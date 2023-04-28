import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { AuthTokensType, AuthTypes, User } from "../type/AuthType";
import { login, logout } from "../thunk/AuthThunk";

const initialState: AuthTypes = {
  authTokens: null,
  user: null,
  loginMessage: null,
};

export const AuthSlicer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setAuthTokens: (state, action: PayloadAction<AuthTokensType>) => {
      state.authTokens = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout.fulfilled, (state) => {
      state.authTokens = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginMessage = { status: "berhasil", message: "Anda berhasil login" };
      state.user = jwt_decode(action.payload.access!);
    });
  },
});

export const { setUser, setAuthTokens } = AuthSlicer.actions;

export default AuthSlicer.reducer;
