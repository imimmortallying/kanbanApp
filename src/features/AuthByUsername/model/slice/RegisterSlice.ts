import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterUser } from "../services/RegisterUser";

export const RegisterSlice = createSlice({
    name: 'registration',
    initialState: {},
    reducers: {
        sendMessage: (state, action) => {
            //@ts-ignore
            state.error = action.payload
        },
        removeResponseStatus: (state) => {
            //@ts-ignore
        state.status = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(RegisterUser.pending, (state) => {
                //@ts-ignore
                state.status = undefined;
                //@ts-ignore
                state.isLoading = true;
                //@ts-ignore

            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                //@ts-ignore
                state.isLoading = false;
                //@ts-ignore
                state.status = action.payload
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                //@ts-ignore
                state.isLoading = false;
                //@ts-ignore
                state.status = action.payload;
                //@ts-ignore
            });
    },

})

export default RegisterSlice.reducer

export const { actions: registrationActions } = RegisterSlice;