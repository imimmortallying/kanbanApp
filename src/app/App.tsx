
import "./styles/index.scss";
import { MainPage } from "pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { classNames } from "shared/lib/classNames/classNames";
import { Suspense, useContext, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./providers/ThemeProvider/ThemeContext";
import { useTheme } from "./providers/ThemeProvider/useTheme";
import { useDispatch } from "react-redux";
import { userActions } from "entities/User/model/slice/userSlice";
import { InitReduxByToken } from "features/AuthByUsername/model/services/InitReduxByToken";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { useAppDispatch } from "./hooks/hooks";




const App = () => {

    const dispatch = useDispatch ();
    useEffect( ()=> {
        dispatch(userActions.initAuthData())
    }, [dispatch]) // 32.50 это логика проверки того, авторизован ли пользователь, проверка наличия токена. Как это работает?
    // работает лишь 1 раз!





    const { theme } = useTheme();
    // вызвать в нужном месте, добавить кнопку для переключения

    return (
        <Suspense fallback=''>
            <div className={classNames(`app`, {}, [theme])}>
                <Routes>
                    <Route path='/' element={<MainPage />} />
                </Routes>
            </div>
        </Suspense>



    )
}

export default App;