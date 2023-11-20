import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginModal.module.scss"
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { ReactNode, useEffect, useState } from "react";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { registrationActions } from "features/AuthByUsername/model/slice/RegisterSlice";

interface LoginModalProps {
    className?: string;
    isOpened: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpened, onClose }: LoginModalProps) => {

    const { t } = useTranslation();

    const dispatch = useDispatch();

    const [isLoginOrRegistration, setIsLoginOrRegistration] = useState('login');

    const toggleModalInnerForm = () => {
        isLoginOrRegistration === 'login' ? setIsLoginOrRegistration('registration') : setIsLoginOrRegistration('login'),
            onMessageChange(''),
            onModalStateChange('') // очищает сообщение, чтобы при переключении между формами не было ни сообщения, ни выделения инпутов красным
        dispatch(registrationActions.removeResponseStatus()) // очищаю статус ответа, чтобы при переключении му регистрацией и логином пропадал ответ
    }

    // тут локально хранится сообщение, которое показывается при нажатии на кнопку регистрации
    // если в redux получен как-то ответ от сервера - вывожу соотв. сообщение
    // если пароли не совпадают, то меняю лок.стейт
    const [messageOnClick, setMessageOnClick] = useState('');
    const onMessageChange = (newMessage: string) => {
        setMessageOnClick(newMessage)
    }

    // пробую сделать стейт = ошибка || ничего || успех, чтобы менять цвет полей и текста не из того, какое сообщение, а какой стейт этого сообщения
    const [modalState, setModalState] = useState('');
    const onModalStateChange = (newModalState: string) => {
        setModalState(newModalState)
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
                        <LoginForm
                            setMessageOnClick={setMessageOnClick}
                            messageOnClick={messageOnClick}
                            onModalStateChange={onModalStateChange}
                            modalState={modalState} />
                        <div className={cls.footer}>
                            <div className={cls.text}>{t('Нет аккаунта?')}</div>
                            <Button onClick={toggleModalInnerForm}>{t('Регистрация')}</Button>
                        </div>

                </>}
            {isLoginOrRegistration === 'registration' &&
                <>
                        <RegistrationForm
                            className={cls.form}
                            onMessageChange={onMessageChange}
                            messageOnClick={messageOnClick}
                            onModalStateChange={onModalStateChange}
                            modalState={modalState}
                        />
                        <div className={cls.footer}>
                            <div className={cls.text}>{t('Уже есть аккаунт?')}</div>
                            <Button onClick={toggleModalInnerForm}>{t('Войти')}</Button>
                        </div>
                </>
            }

        </Modal>
    );
};