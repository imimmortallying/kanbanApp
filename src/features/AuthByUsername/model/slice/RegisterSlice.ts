import { createSlice } from "@reduxjs/toolkit";
import { RegisterUser } from "../services/RegisterUser";
import { IRegistration } from "./types";

const initialState: IRegistration = {
  status: undefined,
  isLoading: false,
  error: undefined,
};

export const RegisterSlice = createSlice({
  name: "registration",
  initialState: initialState,
  reducers: {
    removeResponseStatus: (state) => {
      state.status = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RegisterUser.pending, (state) => {
        state.status = undefined;
        state.isLoading = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      });
  },
});

export default RegisterSlice.reducer;

export const { actions: registrationActions } = RegisterSlice;
