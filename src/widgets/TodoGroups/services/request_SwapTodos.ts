import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { userActions } from "entities/User/model/slice/userSlice";
import { User } from "entities/User/model/types/user";
import { addGroupResponse, initGroupsState, swapGroupsResponse } from "features/groupsReducer/groupsSlice";
import { initTodosState } from "features/todosReducer/todosSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface request_SwapTodos {
    username: string;
    todos: [];
}

export const request_SwapTodos = createAsyncThunk <Number, request_SwapTodos, { rejectValue: string }>(
    'request_swapTodos', // что это?
    async (authData, thunkAPI) => {
        console.log('auth: ', authData)
        try {
            const response = await axios.post('http://localhost:8000/swapTodos', authData);
            
            if (!response.data) {
                throw new Error();
            }
            
            //! пробую при входе сразу вызвать action из gropsSlice. Где правильно это делать?
            // console.log('response', response.data)
            // thunkAPI.dispatch(swapTodosResponse(response.data))
            
            return response.status
        } catch (e) {
            // console.log(e);
            return thunkAPI.rejectWithValue(e.response.status) // тут перевод будет 29.34
        }

    }
)