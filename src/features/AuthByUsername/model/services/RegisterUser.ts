import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface RegisterUser {
  username: string;
  password: string;
}

export const RegisterUser = createAsyncThunk<
  Number,
  RegisterUser,
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
