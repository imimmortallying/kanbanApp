import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginForm.module.scss"
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername";
import { useAppDispatch } from "app/hooks/hooks";
import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { Button, Input, Typography } from "antd";
import { useTranslation } from "react-i18next";


interface LoginFormProps {
    className?: string;
    messageOnClick?: string;
    setMessageOnClick: any;

    onModalStateChange: any;
    modalState: string;
}

// можно добавить автофокус при открытии формы

export const LoginForm = ({ className, setMessageOnClick, messageOnClick, modalState, onModalStateChange }: LoginFormProps) => {

    const { Text} = Typography;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const {
        // username, password, error, isLoading, - прочитай getLoginState
        status, isLoading,
    } = useSelector(getLoginState); // обрати внимание на селектор - он возвращает значение, типизированное интерфейсом. Т.е. не напрямую
    // пишу, чтобы он вернул определенные свойства, а свойства из типа


    // я создаю 2 стейта, чтобы хранить onChange значения логина и пароля. Улби на onChange просто отправляет их в redux, зачем?
    const [username, setUsername] = useState('');
    const onUsernameChange = (e: any) => {
        setUsername(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const onMessageChange = (newMessage: string) => {
        setMessageOnClick(newMessage)
    }


    useEffect(() => {
        if (status === 403) {
            onModalStateChange('error'),
            onMessageChange('Неверный пароль или логин')
        }
    }, [status])


    return (

                   <div className={classNames(cls.LoginForm, {}, [className])}>

            {/* <div>{messageOnClick}</div> */}
            <Text type={ modalState === 'error' ? 'danger' : 'success'}>{messageOnClick}</Text>
            {/* выводить не ошибку при ошибке, а сообщение, ранимое в лок стейте, которое либо переопределяется ошибками
            либо сообщение об успехе регистрации */}

            <Input
                className={cls.input}
                onChange={onUsernameChange}
                placeholder={t('Введите логин')}
                status={messageOnClick != '' && password === '' ? 'error' : ''}
            ></Input>
            <Input
                className={cls.input}
                onChange={onPasswordChange}
                placeholder={t('Введите пароль')}
                status={messageOnClick != '' && password === '' ? 'error' : ''}
            ></Input>
            <Button
                onClick={() => {
                    if (username === '' || password === '') {
                        onModalStateChange('error'),
                        onMessageChange(t('Заполните поля'))
                    } else {
                        dispatch(loginByUsername({ username, password }))
                    }
                }}
                disabled={isLoading}
                className={classNames(cls.button, {}, [className])} // тут нужно сделать флаг, т.е если disabled - то на кнопку вешать класс
            >
                {t('Войти')}
            </Button>
            {/*Argument of type 'AsyncThunkAction<void, void, AsyncThunkConfig>' is not assignable to parameter of type 'AnyAction'
            чтобы это исправить (https://github.com/reduxjs/redux-toolkit/issues/2450 ---> https://redux-toolkit.js.org/tutorials/typescript), создал 
              app/hooks/hooks.ts - куда правильно запихать эти кастомные хуки?
              
              
              */}
        </div> 


    );
};