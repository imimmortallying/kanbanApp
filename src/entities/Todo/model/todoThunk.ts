import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { addTodoFromResponse, initTodosState, remove, updateTodo} from "./todosSlice";
import { initGroupsState } from "entities/TodoGroup/todoGroupSlice";

interface addNewTodoRequest {
  username: string;
  groupId: string;
}

export const addNewTodoRequest = createAsyncThunk<
  Number,
  addNewTodoRequest,
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

interface updateTodoRequest {
  username: string;
  newTodo: any;
  todoId: string;
}

export const updateTodoRequest = createAsyncThunk<
  Number,
  updateTodoRequest,
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

interface deleteTodoRequest {
    username: string;
    todoId: string;
}

export const deleteTodoRequest = createAsyncThunk <Number, deleteTodoRequest, { rejectValue: string }>(
    'deleteTodoRequest',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8000/deleteTodo', authData);
            
            if (!response.data) {
                throw new Error();
            }

            thunkAPI.dispatch(remove(response.data))
            
            return response.status
        } catch (e) {
            return thunkAPI.rejectWithValue(e.response.status);
        }

    }
)

interface swapTodosRequest {
  username: string;
  todos: any[];
}

export const swapTodosRequest = createAsyncThunk <Number, swapTodosRequest, { rejectValue: string }>(
  'swapTodosRequest',
  async (authData, thunkAPI) => {
      console.log('swapTodosRequest')
      try {
          const response = await axios.post('http://localhost:8000/swapTodos', authData);
          
          if (!response.data) {
              throw new Error();
          }
          
          // thunkAPI.dispatch(swapTodosResponse(response.data))
          
          return response.status
      } catch (e) {
          return thunkAPI.rejectWithValue(e.response.status);
      }

  }
)

interface LoginByUsernameProps {
  username: string;
  password: string;
}

export const InitReduxByToken = createAsyncThunk <Number, LoginByUsernameProps, { rejectValue: string }>(
  'InitReduxByToken',
  async (authData, thunkAPI) => {
      try {
          const response = await axios.post('http://localhost:8000/userTodos', authData);

          if (!response.data) {
              throw new Error();
          }

          thunkAPI.dispatch(initGroupsState(response.data.data.groups))
          thunkAPI.dispatch(initTodosState(response.data.data.todos))

          return response.status
      } catch (e) {
          return thunkAPI.rejectWithValue(e.response.status)
      }

  }
)
