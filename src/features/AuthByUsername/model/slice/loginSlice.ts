import { createSlice } from "@reduxjs/toolkit";
import { loginByUsername } from "../services/loginByUsername";
import { ILogin } from "./types";

const initialState: ILogin = { status: undefined, isLoading: false };

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    removeResponseStatus: (state) => {
      state.status = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.status = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      });
  },
});

export default loginSlice.reducer;
export const { actions: loginActions } = loginSlice;
