import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LoginModal.module.scss"
import { Modal } from "shared/ui/Modal/Modal";
import { LoginForm } from "../LoginForm/LoginForm";
import { ReactNode } from "react";

interface LoginModalProps {
    className?: string;
    isOpened: boolean;
    onClose: () => void;
}

export const LoginModal = ({ className, isOpened, onClose }: LoginModalProps) => {



    return (
        <Modal
            isOpened={isOpened} // для чего я должен получать пропсом isOpende и onClose,если <modal> уже их получает. Запутался. Или я просто передаю эти же пропсы глубже
            // т.к modal теперь внутри LoginModal
            onClose={onClose}
            className={classNames(cls.LoginModal, {}, [className])}
            lazy
        >
            <LoginForm />
        </Modal>
    );
};