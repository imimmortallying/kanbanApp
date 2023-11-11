import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginModal.module.scss"
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { ReactNode, useEffect, useState } from "react";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";

interface LoginModalProps {
    className?: string;
    isOpened: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpened, onClose }: LoginModalProps) => {

    const [isLoginOrRegistration, setIsLoginOrRegistration] = useState('login');

    const toggleModalInnerForm = () => {
        isLoginOrRegistration === 'login' ? setIsLoginOrRegistration('registration') : setIsLoginOrRegistration('login')
    }


    return (
        <Modal
            isOpened={isOpened} // для чего я должен получать пропсом isOpende и onClose,если <modal> уже их получает. Запутался. Или я просто передаю эти же пропсы глубже
            // т.к modal теперь внутри LoginModal
            onClose={onClose}
            className={classNames(cls.LoginModal, {}, [className])}
            lazy

        >
            {isLoginOrRegistration === 'login' &&
                <>
                    <LoginForm />
                    <div className={cls.footer}>
                        <div className={cls.text}>нет аккаунта? создай</div>
                        <button onClick={toggleModalInnerForm}>Регистрация</button>
                    </div>
                </>}
            {isLoginOrRegistration === 'registration' &&
                <>
                    <RegistrationForm />
                    <div className={cls.footer}>
                        <div className={cls.text}>уже есть аккаунт? войди</div>
                        <button onClick={toggleModalInnerForm}>Вход</button>
                    </div>

                </>
            }

        </Modal>
    );
};