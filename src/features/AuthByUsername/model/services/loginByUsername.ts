import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initTodosState } from "entities/Todo/model/todosSlice";
import { initGroupsState } from "entities/TodoGroup/todoGroupSlice";
import { userActions } from "entities/User/model/slice/userSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const loginByUsername = createAsyncThunk<
  Number,
  LoginByUsernameProps,
  { rejectValue: string }
>("login/loginByUsername", async (authData, thunkAPI) => {
  try {
    const response = await axios.post("http://localhost:8000/login", authData);

    if (!response.data) {
      throw new Error();
    }

    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
    thunkAPI.dispatch(userActions.setAuthData(response.data));
    thunkAPI.dispatch(initGroupsState(response.data.data.groups));
    thunkAPI.dispatch(initTodosState(response.data.data.todos));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});
