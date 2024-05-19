import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addTodoFromResponse,
  initTodosState,
  remove,
  updateTodo,
} from "./todosSlice";
import { initGroupsState } from "entities/TodoGroup/todoGroupSlice";
import { IGroup } from "entities/TodoGroup/types";
import { IUserAuthData } from "entities/User/model/slice/types";
import { ITodo, IUpdateTodoRequest } from "./types";

interface IAddNewTodoRequest {
  username: IUserAuthData["username"];
  groupId: IGroup["id"];
}

export const addNewTodoRequest = createAsyncThunk<
  Number,
  IAddNewTodoRequest,
  { rejectValue: string }
>("addNewTodoRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/addTodo",
      authData
    );

    if (!response.data) {
      throw new Error();
    }
    thunkAPI.dispatch(addTodoFromResponse(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});



export const updateTodoRequest = createAsyncThunk<
  Number,
  IUpdateTodoRequest,
  { rejectValue: string }
>("updateTodoRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/updateTodo",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(updateTodo(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

interface IDeleteTodoRequest {
  username: IUserAuthData["username"];
  todoId: ITodo["id"];
}

export const deleteTodoRequest = createAsyncThunk<
  Number,
  IDeleteTodoRequest,
  { rejectValue: string }
>("deleteTodoRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/deleteTodo",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(remove(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

interface ISwapTodosRequest {
  username: IUserAuthData["username"];
  todos: ITodo[];
}

export const swapTodosRequest = createAsyncThunk<
  Number,
  ISwapTodosRequest,
  { rejectValue: string }
>("swapTodosRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/swapTodos",
      authData
    );
    if (!response.data) {
      throw new Error();
    }
    // thunkAPI.dispatch(swapTodosResponse(response.data))
    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

interface LoginByUsernameProps {
  username: IUserAuthData["username"];
  password: IUserAuthData["password"];
}

export const InitReduxByToken = createAsyncThunk<
  Number,
  LoginByUsernameProps,
  { rejectValue: string }
>("InitReduxByToken", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/userTodos",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(initGroupsState(response.data.data.groups));
    thunkAPI.dispatch(initTodosState(response.data.data.todos));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});
