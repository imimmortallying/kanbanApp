import { useState } from "react";
import { useDispatch } from "react-redux";

import cls from "./LoginModal.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import { Modal } from "shared/ui/Modal/Modal";

import { LoginForm } from "../LoginForm/LoginForm";
import { RegistrationForm } from "../RegistrationForm/RegistrationForm";

import { registrationActions } from "features/AuthByUsername/model/slice/RegisterSlice";
import { loginActions } from "features/AuthByUsername/model/slice/loginSlice";

interface LoginModalProps {
  className?: string;
  isOpened: boolean;
  onClose: () => void;
}

export const LoginModal = ({
  className,
  isOpened,
  onClose,
}: LoginModalProps) => {

  const dispatch = useDispatch();

  const [isLoginOrRegistration, setIsLoginOrRegistration] = useState("login");

  const toggleModalInnerForm = () => {
    isLoginOrRegistration === "login"
      ? setIsLoginOrRegistration("registration")
      : setIsLoginOrRegistration("login");
    dispatch(registrationActions.removeResponseStatus());
    dispatch(loginActions.removeResponseStatus());
  };

  return (
    <Modal
      isOpened={isOpened}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className])}
      lazy
    >
      {isLoginOrRegistration === "login" && (
          <LoginForm toggleModalInnerForm={toggleModalInnerForm}/>
      )}
      {isLoginOrRegistration === "registration" && (
          <RegistrationForm className={cls.form} toggleModalInnerForm={toggleModalInnerForm}/>
      )}
    </Modal>
  );
};
