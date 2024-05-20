import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addGroupFromResponse,
  changeGroupNameFromResponse,
  removeGroupFromResponse,
} from "./todoGroupSlice";
import { removeTodoGroup } from "entities/Todo/model/todosSlice";
import { IGroup } from "./types";
import { IUserAuthData } from "entities/User/model/slice/types";

interface IChangeGroupNameRequest {
  username: IUserAuthData["username"];
  groupId: IGroup["id"];
  newName: IGroup["name"];
}

export const changeGroupNameRequest = createAsyncThunk<
  number,
  IChangeGroupNameRequest,
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

interface IDeleteGroupRequest {
  username: IUserAuthData["username"];
  groupId: IGroup["id"];
}

export const deleteGroupRequest = createAsyncThunk<
  number,
  IDeleteGroupRequest,
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

interface IAddNewGroupRequest {
  username: IUserAuthData["username"];
}

export const addNewGroupRequest = createAsyncThunk<
  number,
  IAddNewGroupRequest,
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

interface ISwapGroupsRequest {
  username: IUserAuthData["username"];
  groups: IGroup[];
}

export const swapGroupsRequest = createAsyncThunk<
  number,
  ISwapGroupsRequest,
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
