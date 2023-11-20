import { classNames } from "shared/lib/classNames/classNames";

import cls from "./RegistrationForm.module.scss"
import { useEffect, useState } from "react";
import { useAppDispatch } from "app/hooks/hooks";
import { RegisterUser } from "features/AuthByUsername/model/services/RegisterUser";
import { useSelector } from "react-redux";
import { getRegisterState } from "features/AuthByUsername/model/selectors/getLoginState/getRegisterState";
import { userActions } from "entities/User/model/slice/userSlice";
import { registrationActions } from "features/AuthByUsername/model/slice/RegisterSlice";
import { Button, Input, Typography } from "antd";

import { useTranslation } from "react-i18next";

interface RegistrationFormProps {
    className?: string;
    messageOnClick?: string;
    onMessageChange: any;

    onModalStateChange: any;
    modalState: string;
}

export const RegistrationForm = ({ className, onMessageChange, messageOnClick, modalState, onModalStateChange}: RegistrationFormProps) => {

    const { Text} = Typography;

    const dispatch = useAppDispatch();

    const { t } = useTranslation();

    const {
        status
    } = useSelector(getRegisterState);
    // console.log('regiistState', useSelector(getRegisterState))

    const [username, setUsername] = useState('');
    const onUsernameChange = (e: any) => {
        setUsername(e.target.value)
    }

    const [password, setPassword] = useState('');
    const onPasswordChange = (e: any) => {
        setPassword(e.target.value)
    }

    const [passwordRepeat, setPasswordRepeat] = useState('');
    const onPasswordRepeatChange = (e: any) => {
        setPasswordRepeat(e.target.value)
    }


    // тут локально хранится сообщение, которое показывается при нажатии на кнопку регистрации
    // если в redux получен как-то ответ от сервера - вывожу соотв. сообщение
    // если пароли не совпадают, то меняю лок.стейт
    // const [messageOnClick, setMessageOnClick] = useState('');
    // const onMessageChange = (newMessage: string) => {
    //     setMessageOnClick(newMessage);
    // }

    useEffect(() => {
        if (status === 400) {
            onModalStateChange('error'),
            onMessageChange(t('Пользователь уже зарегистрирован'))
        }
        if (status === 200) {
            onModalStateChange('success'),
            onMessageChange(t('Регистраиця успешна'))
        }
    }, [status])



    return (
        <div className={classNames(cls.RegistrationForm, {}, [className])}>
            {/* <Text type={messageOnClick === 'Заполните поля' || messageOnClick === 'Пароли не совпадают' || status === 400 ? 'danger' : 'success'}>{messageOnClick}</Text> */}
            <Text type={ modalState === 'error' ? 'danger' : 'success'}>{messageOnClick}</Text>
            {/* <input type="text" placeholder='Введите логин' onChange={onUsernameChange} /> */}
            <Input
                placeholder={t('Введите логин')}
                onChange={onUsernameChange}
                status={messageOnClick != '' && username === '' ? 'error' : ''}
            />


            <Input
                placeholder={t('Введите пароль')}
                onChange={onPasswordChange}
                status={messageOnClick != '' && password === '' ? 'error' : ''}
            />

            <Input
                placeholder={t('Повторите пароль')}
                onChange={onPasswordRepeatChange}
                status={messageOnClick != '' && passwordRepeat === '' ? 'error' : ''}
            />
            <Button
                onClick={() => {
                    if (password === '' || username === '' || passwordRepeat === '') {
                        onModalStateChange('error')
                        onMessageChange(t('Заполните поля'))
                    }
                    else if (password === passwordRepeat) {
                        dispatch(RegisterUser({ username, password }))
                    } else {
                        onModalStateChange('error')
                        onMessageChange(t('Пароли не совпадают')) // мб не хранить в редаксе, а просто поменять LS сообщения
                    }
                }
                }
            >
                {t('Зарегистрироваться')}
            </Button>
        </div>
    );
};