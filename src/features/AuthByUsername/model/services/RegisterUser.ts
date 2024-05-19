import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserAuthData } from "entities/User/model/slice/types";

interface IRegisterUser {
  username: IUserAuthData["username"];
  password: IUserAuthData["password"];
}

export const RegisterUser = createAsyncThunk<
  Number,
  IRegisterUser,
  { rejectValue: string }
>("Registration/RegisterUser", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/registration",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});
