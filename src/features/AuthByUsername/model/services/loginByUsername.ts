import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { userActions } from "entities/User/model/slice/userSlice";
import { User } from "entities/User/model/types/user";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
    username: string;
    password: string;
}

// export const loginByUsername = createAsyncThunk<any, any, { rejectValue: string }> (
// export const loginByUsername = createAsyncThunk ( // - так не ошибки тут, но вылезает ошибка при вызове и передаче loginByUsername аргументов 
// пришлось добавить return response.data - почему? ошибка, если не добавить, хуй проссышь че хочет


export const loginByUsername = createAsyncThunk <User, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername',
    async (authData, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:8000/login', authData);


            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)) // имитация хранения токена авторизации . Все глобальные константы см в shared/const
// когда разлогинился, данные из localStorage удаляем

            thunkAPI.dispatch(userActions.setAuthData(response.data)) // тут я заполняю стор (User) пользователя тем, что получил в ответ от сервера?
            return response.data
        } catch (e) {
            console.log(e);
            return thunkAPI.rejectWithValue('error') // тут перевод будет 29.34
        }

    }
)