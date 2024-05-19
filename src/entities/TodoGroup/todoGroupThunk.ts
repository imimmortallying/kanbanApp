import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addGroupFromResponse,
  changeGroupNameFromResponse,
  removeGroupFromResponse,
} from "./todoGroupSlice";
import { removeTodoGroup } from "entities/Todo/model/todosSlice";

interface changeGroupNameRequest {
  username: string;
  groupId: string;
  newName: string;
}

export const changeGroupNameRequest = createAsyncThunk<
  Number,
  changeGroupNameRequest,
  { rejectValue: string }
>("changeGroupNameRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/changeGroupName",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(changeGroupNameFromResponse(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

interface deleteGroupRequest {
  username: string;
  groupId: string;
}

export const deleteGroupRequest = createAsyncThunk<
  Number,
  deleteGroupRequest,
  { rejectValue: string }
>("deleteGroupRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/deleteGroup",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(removeGroupFromResponse(response.data));
    thunkAPI.dispatch(removeTodoGroup(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

interface addNewGroupRequest {
  username: string;
}

export const addNewGroupRequest = createAsyncThunk<
  Number,
  addNewGroupRequest,
  { rejectValue: string }
>("addNewGroupRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/newGroup",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    thunkAPI.dispatch(addGroupFromResponse(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

interface swapGroupsRequest {
  username: string;
  groups: any[];
}

export const swapGroupsRequest = createAsyncThunk<
  Number,
  swapGroupsRequest,
  { rejectValue: string }
>("swapGroupsRequest", async (authData, thunkAPI) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/swapGroups",
      authData
    );

    if (!response.data) {
      throw new Error();
    }

    // thunkAPI.dispatch(swapGroupsFromResponse(response.data));

    return response.status;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});
