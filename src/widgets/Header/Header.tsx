import cls from "./Header.module.scss";
import { FindTodo } from "features/FindTodo";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";
import { useCallback, useState } from "react";
import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { LoginModal } from "features/AuthByUsername";
import { LoginButton } from "features/LoginButton/LoginButton";
import { useAppSelector } from "shared/lib/store/redux";
import { FilterAccomplishmentBtns } from "features/TodosVisibilityFilter/ui/FilterAccomplishmentBtns/FilterAccomplishmentBtns";
import { FilterImportance } from "features/TodosVisibilityFilter/ui/FilterImportance/FilterImportance";

interface HeaderProps {}

export const Header = () => {
  const [isAuthOpened, setIsAuthOpened] = useState(false);

  const authData = useAppSelector(selectUserAuthData);

  const onOpenModal = useCallback(() => {
    setIsAuthOpened(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setIsAuthOpened(false);
  }, []);

  return (
    <div className={cls.Header}>
      <FindTodo className={cls.FindTodo} />
      <FilterAccomplishmentBtns className={cls.FilterAccomplishmentBtns} />
      <FilterImportance className={cls.FilterImportance} />
      <div className={cls.contextButtons}>
        <ThemeSwitcher></ThemeSwitcher>
        <LangSwitcher></LangSwitcher>
        <LoginButton authData={authData} onOpenModal={onOpenModal} />
        <LoginModal isOpened={isAuthOpened} onClose={onCloseModal} />
      </div>
    </div>
  );
};
