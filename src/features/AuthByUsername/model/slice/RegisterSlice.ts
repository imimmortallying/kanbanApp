import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterUser } from "../services/RegisterUser";

export const RegisterSlice = createSlice({
    name: 'registration',
    initialState: {},
    reducers:{
        sendMessage: (state, action) => {
            //@ts-ignore
            state.error = action.payload
        },
    },
    extraReducers: (builder) => { 
        builder
            .addCase(RegisterUser.pending, (state) => {
                //@ts-ignore
                state.error = undefined;
                //@ts-ignore
                state.isLoading = true;
            })
            .addCase(RegisterUser.fulfilled, (state, action) => {
                //@ts-ignore
                state.isLoading = false;
            })
            .addCase(RegisterUser.rejected, (state, action) => {
                //@ts-ignore
                state.isLoading = false;
                //@ts-ignore
                state.error = action.payload;
            });
    },

})

export default RegisterSlice.reducer

export const { actions: registrationActions } = RegisterSlice;