import { classNames } from "shared/lib/classNames/classNames";
import { FC, ReactNode, useState, useRef, useEffect, useId, useCallback } from 'react';
import cls from "./MainPage.module.scss"
import { Button, Checkbox, ConfigProvider } from 'antd';


//redux toolkit
import { FilterAccomplishmentBtns } from "features/FilterAcomplishmentBtns";
import { FilterImportance } from "features/FilterImportance";
import { AddTodo } from "features/AddTodo";
import { FindTodo } from "features/FindTodo";
import { TodoGroups } from "widgets/TodoGroups/TodoGroups";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";
import { LangSwitcher2 } from "widgets/LangSwitcher/LangSwitcher2";
import { Modal } from "shared/ui/Modal/Modal";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { userActions } from "entities/User/model/slice/userSlice";
import { useAppDispatch } from "app/hooks/hooks";
import { InitReduxByToken } from "features/AuthByUsername/model/services/InitReduxByToken";
import { clearGroupsState, defaultGroupsState } from "features/groupsReducer/groupsSlice";
import { clearTodosState, defaultTodosState } from "features/todosReducer/todosSlice";
import { useTranslation } from "react-i18next";


//
interface MainPageProps {
    className?: string;
    children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = (props) => {


    const [isAuthOpened, setIsAuthOpened] = useState(false); // зачем мне этот стейт снаружи самого модуля? почему не вызвать внутри модуля?
    // видимо, д.б само окно, но еще д.б кнопка, вызывающая это окно. 

    const { t } = useTranslation();

    const dispatch = useDispatch();
    const dispatchAsync = useAppDispatch();
    const authData = useSelector(getUserAuthData); // добавить public api - index.ts


        useEffect( ()=> {
        dispatch(userActions.initAuthData())
    }, [dispatch])
    useEffect(() => {

  


        console.log('authData', authData)
        //тут каждый раз при изменении токена (удалении при выходе или его получении) инициализирую redux содержимым сервера
        // если часть стейта, прокладка между localStorage, заполнена, то отправить запрос а сервер, иначе заполнить как для невошедшего пользователя
        // сейчас хотя бы просто пустую рисовку
        if (authData) {
            console.log('initByToken', { username: authData.username, password: authData.password })
            dispatchAsync(InitReduxByToken({ username: authData.username, password: authData.password })) // в редаксе как loginByUsername?

            //! тут явно можно вынести этот иф, например асинхронно

        }

        if (!authData) {
            console.log('NO authData', authData)
            // если не вошел
            dispatch(defaultGroupsState())
            // dispatch(clearGroupsState())
            dispatch(defaultTodosState())
            // dispatch(clearTodosState())
        }


    }, [authData])

    const onLogout = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    const onOpenModal = useCallback(() => {
        setIsAuthOpened(true) // сначала передавал внутрь модалки сеттер со значением false, теперь сам сеттер, обернутый ф-ей
    }, []) // какая зависимость. Что делает пустой массив, просто сохраняет и никогда не создает новую ссылку?

    const onCloseModal = useCallback(() => {
        setIsAuthOpened(false)
    }, [])
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#FAAD14',
                    // colorPrimary: theme === 'dark'? '#FAAD14' : '#74fa14', 
                    // а если тем будет 10? если нужно еще и передавать будет целый набор цветов одной темы. Либо с 0 делать самому компоненты
                    // либо научиться полуать динамически переменные из css (см ниже), либо научиться взаимодействовать с antd внутри css 
                    // colorPrimary: getComputedStyle(document.documentElement).getPropertyValue('--third-color'),
                    //! достать переменную темы не получается. Можно задать ее дополнительно в global.scss, тогда увиже ее выше. Но она будет статичная
                    //! как правильно задать в этом случае темы, не переписывая структуру темы вручную?
                    //? один из вариантов смотри в index.scss
                    fontFamily: 'Consolas, "Times New Roman", Serif',
                    fontSize: 16,
                },
            }}
        >

            <div className={classNames(cls.MainPage, {}, [])}>
                <div className={classNames(cls.Header, {}, [])}>
                    <FindTodo className={classNames(cls.FindTodo, {}, [])}></FindTodo>
                    <FilterAccomplishmentBtns className={classNames(cls.FilterAccomplishmentBtns, {}, [])}></FilterAccomplishmentBtns>
                    <FilterImportance className={classNames(cls.FilterImportance, {}, [])}></FilterImportance>
                    <div className={classNames(cls.contextButtons, {}, [])}>
                        <ThemeSwitcher></ThemeSwitcher>
                        <LangSwitcher2></LangSwitcher2>
                        {/* <button onClick={()=>setIsAuthOpened(true)}>Войти</button> - было. Запутался, почему когда-то ()=>{}, когда-то просто ф-я*/}
                        {!authData && <Button onClick={onOpenModal}>{t('Войти')}</Button>}
                        {authData && <Button onClick={onLogout}>{t('Выйти')}</Button>}
                        <LoginModal isOpened={isAuthOpened} onClose={onCloseModal} />
                        {/* //! хули выебывается, когда 2 тега */}
                        {/* </LoginModal> */}
                    </div>

                </div>
                <TodoGroups></TodoGroups>
            </div>
        </ConfigProvider>

    );
};
