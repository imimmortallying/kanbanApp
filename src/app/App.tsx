
import "./styles/index.scss";
import { MainPage } from "pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { DndContext } from "@dnd-kit/core";
import { classNames } from "shared/lib/classNames/classNames";
import { Suspense, useContext, useState } from "react";
import { Theme, ThemeContext } from "./providers/ThemeProvider/ThemeContext";
import { useTheme } from "./providers/ThemeProvider/useTheme";




const App = () => {

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