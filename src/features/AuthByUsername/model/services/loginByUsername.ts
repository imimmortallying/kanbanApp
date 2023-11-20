import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { userActions } from "entities/User/model/slice/userSlice";
import { User } from "entities/User/model/types/user";
import { initGroupsState } from "features/groupsReducer/groupsSlice";
import { initTodosState } from "features/todosReducer/todosSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

interface LoginByUsernameProps {
    username: string;
    password: string;
}


// export const loginByUsername = createAsyncThunk<any, any, { rejectValue: string }> (
// export const loginByUsername = createAsyncThunk ( // - так не ошибки тут, но вылезает ошибка при вызове и передаче loginByUsername аргументов 
// пришлось добавить return response.data - почему? ошибка, если не добавить, хуй проссышь че хочет

// проверить 
export const loginByUsername = createAsyncThunk <Number, LoginByUsernameProps, { rejectValue: string }>(
    'login/loginByUsername', // что это?
    async (authData, thunkAPI) => {
        // console.log('auth: ', authData) - это то, что я отправил из loginForm ч/з action
        try {
            const response = await axios.post('http://localhost:8000/login', authData);
            
            // console.log('auth: ', response.data) - это ответ, который я получу, если запрос удовлетворен


            if (!response.data) {
                throw new Error();
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data)) // имитация хранения токена авторизации . Все глобальные константы см в shared/const
// когда разлогинился, данные из localStorage удаляем

            thunkAPI.dispatch(userActions.setAuthData(response.data)) // тут я заполняю стор (User) пользователя тем, что получил в ответ от сервера?
            // console.log('rrr',response.data.data)
            

            //! пробую при входе сразу вызвать action из gropsSlice. Где правильно это делать?
            thunkAPI.dispatch(initGroupsState(response.data.data.groups))
            thunkAPI.dispatch(initTodosState(response.data.data.todos))
            // после входа и перезагрузки туду исчезают. Тогда почему кнопка "выход" не исчезает? Потому что действия отправляются при загрухке страницы
            // в App.tsx, оттуда обращается в сохраненные поля локалстора. Как правильно организовать заполнение стора? М.б нужно проверять, 
            // если я имею токен, то нужно всегда отправлять запрос о инициализации с сервера? Можно, конечно, доставать из локалстора, но кажется хуевой идеей

            
            return response.status
        } catch (e) {
            // console.log(e);
            return thunkAPI.rejectWithValue(e.response.status) // тут перевод будет 29.34
        }

    }
)