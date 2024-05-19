import { createSlice } from "@reduxjs/toolkit";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { IUser } from "./types";

const initialState: IUser = { authData: undefined };

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      state.authData = user ? JSON.parse(user) : "guest";
    },
    logout: (state) => {
      localStorage.removeItem(USER_LOCALSTORAGE_KEY);
      state.authData = "guest";
    },
  },
});

export default userSlice.reducer;

export const { actions: userActions } = userSlice;
