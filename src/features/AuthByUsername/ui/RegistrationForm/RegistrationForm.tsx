import { classNames } from "shared/lib/classNames/classNames";

import cls from "./RegistrationForm.module.scss"
import { useState } from "react";
import { useAppDispatch } from "app/hooks/hooks";
import { RegisterUser } from "features/AuthByUsername/model/services/RegisterUser";
import { useSelector } from "react-redux";
import { getRegisterState } from "features/AuthByUsername/model/selectors/getLoginState/getRegisterState";
import { userActions } from "entities/User/model/slice/userSlice";
import { registrationActions } from "features/AuthByUsername/model/slice/RegisterSlice";

interface RegistrationFormProps {
    className?: string;
}

export const RegistrationForm = ({ className }: RegistrationFormProps) => {

    const dispatch = useAppDispatch();

    const {
        error
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

    return (
        <div className={classNames(cls.RegistrationForm, {}, [className])}>
            {error && <div>{error}</div>}
            <input type="text" placeholder='Введите логин' onChange={onUsernameChange} />
            <input type="text" placeholder='Введите пароль' onChange={onPasswordChange} />
            <input type="text" placeholder='Повторите пароль' onChange={onPasswordRepeatChange}/>
            <button
                onClick={() => {
                    if (password === passwordRepeat) {
                        dispatch(RegisterUser({ username, password }))
                    } else {
                        dispatch(registrationActions.sendMessage('Пароли не совпадают'))
                    }
                } 
                }
            >
                Зарегистрироваться
            </button>
        </div>
    );
};