import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { initState } from "features/groupsReducer/groupsSlice";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";

export const userSlice = createSlice({
    name: 'user',
    initialState: {},
    reducers: {
        setAuthData: (state, action: PayloadAction<string>) => {
            //@ts-ignore
            state.authData = action.payload // как правильно создать и заполнить свойство объекта?
            // return state = action.payload

            //! добавить инициализацию групп и туду - правильно ли вызывать action тут?
            // initState(action.payload.)
        },
        initAuthData: (state, action: PayloadAction<string>) => { // 32.50 это логика проверки того, авторизован ли пользователь, проверка наличия токена
            //  Как это работает в app.tsx?
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
            if (user) {
                // state = JSON.parse(user) // зачем мне этот action, зачем его вызывать в app.tsx?
                //@ts-ignore
                state.authData = JSON.parse(user)
            }
        },
        logout: (state) => {
            localStorage.removeItem(USER_LOCALSTORAGE_KEY) // правильно ли выполнять это здесь?
            //@ts-ignore
            return state.authData = undefined;
        }
    },

})

export default userSlice.reducer

export const { actions: userActions } = userSlice; // так удобнее, чем запись ниже. Обращаюсь к userActions и нахожу нужный action, без
// необходимости вручную экспортировать и импортировать каждый action

// export const { setAuthData } = userSlice.actions