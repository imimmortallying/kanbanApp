import cls from "./LoginForm.module.scss";
import { ComponentProps, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Input, Typography } from "antd";

import { classNames } from "shared/lib/classNames/classNames";

import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername";
import { getLoginState } from "features/AuthByUsername/model/selectors/getLoginState/getLoginState";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";

interface LoginFormProps {
  className?: string;
  toggleModalInnerForm: () => void;
}

export const LoginForm = ({
  className,
  toggleModalInnerForm,
}: LoginFormProps) => {
  const { Text } = Typography;

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const { status, isLoading } = useAppSelector(getLoginState);

  // стейты взаимодействия с пользователем - сообщение об ошибке и состояние,
  // меняющее красный/зеленый цвет инпутов и сообщения
  const [modalState, setModalState] = useState("");
  const onModalStateChange = (newModalState: string) => {
    setModalState(newModalState);
  };

  const [messageOnClick, setMessageOnClick] = useState("");
  const onMessageChange = (newMessage: string) => {
    setMessageOnClick(newMessage);
  };

  // стейты инпутов
  type InputProps = ComponentProps<"input">["onChange"];

  const [username, setUsername] = useState("");
  const onUsernameChange: InputProps = (e) => {
    setUsername(e.target.value);
  };

  const [password, setPassword] = useState("");
  const onPasswordChange: InputProps = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (status === 403) {
      onModalStateChange("error"), onMessageChange("Неверный пароль или логин");
    }
  }, [status]);

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Text type={modalState === "error" ? "danger" : "success"}>
        {messageOnClick}
      </Text>
      <Input
        className={cls.input}
        onChange={onUsernameChange}
        placeholder={t("Введите логин")}
        status={messageOnClick != "" && password === "" ? "error" : ""}
      />
      <Input
        className={cls.input}
        onChange={onPasswordChange}
        placeholder={t("Введите пароль")}
        status={messageOnClick != "" && password === "" ? "error" : ""}
      />
      <Button
        onClick={() => {
          if (username === "" || password === "") {
            onModalStateChange("error"), onMessageChange(t("Заполните поля"));
          } else {
            dispatch(loginByUsername({ username, password }));
          }
        }}
        disabled={isLoading}
        className={classNames(cls.button, {}, [className])}
      >
        {t("Войти")}
      </Button>
      <div className={cls.footer}>
        <div className={cls.text}>{t("Нет аккаунта?")}</div>
        <Button onClick={toggleModalInnerForm}>{t("Регистрация")}</Button>
      </div>
    </div>
  );
};
