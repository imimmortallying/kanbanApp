
import "./styles/index.scss";
import { MainPage } from "pages/MainPage";
import { Route, Routes } from "react-router-dom";
import { classNames } from "shared/lib/classNames/classNames";
import { Suspense } from "react";
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