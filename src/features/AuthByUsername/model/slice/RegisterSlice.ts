import { createSlice } from "@reduxjs/toolkit";
import { RegisterUser } from "../services/RegisterUser";

export const RegisterSlice = createSlice({
  name: "registration",
  initialState: { status: undefined, isLoading: false, error: undefined },
  reducers: {
    sendMessage: (state, action) => {
      state.error = action.payload;
    },
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
