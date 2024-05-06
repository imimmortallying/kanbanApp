import { ComponentProps, useEffect, useState } from "react";
import { Button, Input, Typography } from "antd";
import cls from "./RegistrationForm.module.scss";

import { classNames } from "shared/lib/classNames/classNames";

import { RegisterUser } from "features/AuthByUsername/model/services/RegisterUser";
import { getRegisterState } from "features/AuthByUsername/model/selectors/getLoginState/getRegisterState";

import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";

interface RegistrationFormProps {
  className?: string;
  toggleModalInnerForm: () => void;
}

export const RegistrationForm = ({
  className,
  toggleModalInnerForm,
}: RegistrationFormProps) => {
  const { Text } = Typography;

  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(getRegisterState);

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

  const [passwordRepeat, setPasswordRepeat] = useState("");
  const onPasswordRepeatChange: InputProps = (e) => {
    setPasswordRepeat(e.target.value);
  };

  // стейты взаимодействия с пользователем - сообщение об ошибке и состояние,
  // меняющие красный/зеленый цвет инпутов и сообщения
  const [messageOnClick, setMessageOnClick] = useState("");
  const onMessageChange = (newMessage: string) => {
    setMessageOnClick(newMessage);
  };

  const [modalState, setModalState] = useState("");
  const onModalStateChange = (newModalState: string) => {
    setModalState(newModalState);
  };

  useEffect(() => {
    if (status === 400) {
      onModalStateChange("error"),
        onMessageChange(t("Пользователь уже зарегистрирован"));
    }
    if (status === 200) {
      onModalStateChange("success"), onMessageChange(t("Регистраиця успешна"));
    }
  }, [status]);

  return (
    <div className={classNames(cls.RegistrationForm, {}, [className])}>
      <Text type={modalState === "error" ? "danger" : "success"}>
        {messageOnClick}
      </Text>
      <Input
        placeholder={t("Введите логин")}
        onChange={onUsernameChange}
        status={messageOnClick != "" && username === "" ? "error" : ""}
      />

      <Input
        placeholder={t("Введите пароль")}
        onChange={onPasswordChange}
        status={messageOnClick != "" && password === "" ? "error" : ""}
      />

      <Input
        placeholder={t("Повторите пароль")}
        onChange={onPasswordRepeatChange}
        status={messageOnClick != "" && passwordRepeat === "" ? "error" : ""}
      />
      <Button
        onClick={() => {
          if (password === "" || username === "" || passwordRepeat === "") {
            onModalStateChange("error");
            onMessageChange(t("Заполните поля"));
          } else if (password === passwordRepeat) {
            dispatch(RegisterUser({ username, password }));
          } else {
            onModalStateChange("error");
            onMessageChange(t("Пароли не совпадают"));
          }
        }}
      >
        {t("Зарегистрироваться")}
      </Button>
      <div className={cls.footer}>
        <div className={cls.text}>{t("Уже есть аккаунт?")}</div>
        <Button onClick={toggleModalInnerForm}>{t("Войти")}</Button>
      </div>
    </div>
  );
};
