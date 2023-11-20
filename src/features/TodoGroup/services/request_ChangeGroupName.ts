import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { userActions } from "entities/User/model/slice/userSlice";
import { User } from "entities/User/model/types/user";
import { addGroupResponse, changeGroupNameResponse, initGroupsState, removeGroupResponse } from "features/groupsReducer/groupsSlice";
import { initTodosState } from "features/todosReducer/todosSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface request_ChangeGroupName {
    username: string;
    groupId: string;
    newName : string;
}

export const request_ChangeGroupName = createAsyncThunk <Number, request_ChangeGroupName, { rejectValue: string }>(
    'changeGroupName', // что это?
    async (authData, thunkAPI) => {
        console.log('auth: ', authData)
        try {
            const response = await axios.post('http://localhost:8000/changeGroupName', authData);
            
            if (!response.data) {
                throw new Error();
            }
            
            //! пробую при входе сразу вызвать action из gropsSlice. Где правильно это делать?
            console.log('response', response.data)
            thunkAPI.dispatch(changeGroupNameResponse(response.data))
            
            return response.status
        } catch (e) {
            // console.log(e);
            return thunkAPI.rejectWithValue(e.response.status) // тут перевод будет 29.34
        }

    }
)