import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginByUsername } from "../services/loginByUsername";

export const loginSlice = createSlice({
  name: "login",
  initialState: { status: undefined, isLoading: false },
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
