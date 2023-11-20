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

// задача: достать из хранилища логин и пароль, отправить на сервер и получить data, которой сразу заполнить redux
export const InitReduxByToken = createAsyncThunk <Number, LoginByUsernameProps, { rejectValue: string }>(
    'request_userTodos', // что это? - это как минимум название action
    async (authData, thunkAPI) => {

        try {
            const response = await axios.post('http://localhost:8000/userTodos', authData);

            if (!response.data) {
                throw new Error();
            }

            //! код дублируется - см App.tsx

            thunkAPI.dispatch(initGroupsState(response.data.data.groups))
            thunkAPI.dispatch(initTodosState(response.data.data.todos))

            //! пробую при входе сразу вызвать action из gropsSlice. Где правильно это делать?
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