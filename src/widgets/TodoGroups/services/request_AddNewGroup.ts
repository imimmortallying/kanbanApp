import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { userActions } from "entities/User/model/slice/userSlice";
import { User } from "entities/User/model/types/user";
import { addGroupResponse, initGroupsState } from "features/groupsReducer/groupsSlice";
import { initTodosState } from "features/todosReducer/todosSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface request_AddNewGroup {
    username: string;
}

export const request_AddNewGroup = createAsyncThunk <Number, request_AddNewGroup, { rejectValue: string }>(
    'request_newGroup', // что это?
    async (authData, thunkAPI) => {
        // console.log('auth: ', authData)
        try {
            const response = await axios.post('http://localhost:8000/newGroup', authData);
            
            if (!response.data) {
                throw new Error();
            }
            
            //! пробую при входе сразу вызвать action из gropsSlice. Где правильно это делать?
            console.log('response', response.data)
            thunkAPI.dispatch(addGroupResponse(response.data))
            
            return response.status
        } catch (e) {
            // console.log(e);
            return thunkAPI.rejectWithValue(e.response.status) // тут перевод будет 29.34
        }

    }
)