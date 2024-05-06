import { Button } from "antd";
import cls from "./LoginButton.module.scss";
import { userActions } from "entities/User/model/slice/userSlice";
import { t } from "i18next";
import { useDispatch } from "react-redux";

interface LoginButtonProps {
  authData: string;
  onOpenModal: () => void;
}

export const LoginButton = ({ authData, onOpenModal }: LoginButtonProps) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <div>
      {authData === "guest" ? (
        <Button onClick={onOpenModal}>{t("Войти")}</Button>
      ) : (
        <Button onClick={onLogout}>{t("Выйти")}</Button>
      )}
    </div>
  );
};
