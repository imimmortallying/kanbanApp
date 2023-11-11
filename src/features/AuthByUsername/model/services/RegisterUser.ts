import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { userActions } from "entities/User/model/slice/userSlice";
import { User } from "entities/User/model/types/user";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface RegisterUser {
    username: string;
    password: string;
}

// проверить 
export const RegisterUser = createAsyncThunk <User, RegisterUser, { rejectValue: string }>(
    'Registration/RegisterUser',
    async (authData, thunkAPI) => {
        // console.log('regist:', authData)
        try {
            const response = await axios.post('http://localhost:8000/registration', authData);


            if (!response.data) {
                throw new Error();
            }

            // localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)) // имитация хранения токена авторизации . Все глобальные константы см в shared/const
// когда разлогинился, данные из localStorage удаляем

            // thunkAPI.dispatch(userActions.setAuthData(response.data)) // если добавить, сразу будет логин тем, чем зарегался
            return response.data
        } catch (e) {
            console.log(e.response.data.message);
            // добавить условие на входящую ошибку, чтобы для каждой задать свой текст, который нужно будет перевести
            return thunkAPI.rejectWithValue(e.response.data.message) // тут перевод будет 29.34
        }

    }
)