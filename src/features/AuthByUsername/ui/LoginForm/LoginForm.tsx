import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginForm.module.scss"
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername";
import { useAppDispatch } from "app/hooks/hooks";
import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";


interface LoginFormProps {
    className?: string;
}

// можно добавить автофокус при открытии формы

export const LoginForm = ({ className,}: LoginFormProps) => {

    const dispatch = useAppDispatch();

    const {
        // username, password, error, isLoading, - прочитай getLoginState
        error, isLoading,
    } = useSelector(getLoginState); // обрати внимание на селектор - он возвращает значение, типизированное интерфейсом. Т.е. не напрямую
    // пишу, чтобы он вернул определенные свойства, а свойства из типа
    console.log(error, isLoading)


    // я создаю 2 стейта, чтобы хранить onChange значения логина и пароля. Улби на onChange просто отправляет их в redux, зачем?
    const [username, setUsername] = useState('');
    const onUsernameChange = (e: any) => {
        setUsername(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    // const onLoginClick = useCallback(()=>{
    //     dispatch(loginByUsername({username, password}))
    // }, [])


    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>

            {error && <div>{error}</div>}
            
            <input type="text" className={cls.input} onChange={onUsernameChange} placeholder='Введите логин' />
            <input type="text" className={cls.input} onChange={onPasswordChange} placeholder='Введите пароль' />
            <button
                onClick={() => dispatch(loginByUsername({ username, password }))}
                disabled={isLoading}
                className={classNames(cls.button, {}, [className])} // тут нужно сделать флаг, т.е если disabled - то на кнопку вешать класс
            >Войти</button>
            {/*Argument of type 'AsyncThunkAction<void, void, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'
            чтобы это исправить (https://github.com/reduxjs/redux-toolkit/issues/2450 ---> https://redux-toolkit.js.org/tutorials/typescript), создал 
              app/hooks/hooks.ts - куда правильно запихать эти кастомные хуки?
              
              
              */}
        </div>
    );
};