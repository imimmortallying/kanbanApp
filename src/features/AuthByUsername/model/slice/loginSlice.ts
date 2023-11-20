import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginByUsername } from "../services/loginByUsername";

export const loginSlice = createSlice({
    name: 'login',
    initialState: {},
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                //@ts-ignore
                state.status = undefined;
                //@ts-ignore
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state, action) => {
                //@ts-ignore
                state.isLoading = false;
                //@ts-ignore
                state.status = action.payload;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                //@ts-ignore
                state.isLoading = false;
                //@ts-ignore
                state.status = action.payload;

            });
    },

})

export default loginSlice.reducer