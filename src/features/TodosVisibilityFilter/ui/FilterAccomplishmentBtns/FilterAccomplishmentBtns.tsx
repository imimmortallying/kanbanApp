import { useDispatch } from "react-redux";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./FilterAccomplishmentBtns.module.scss";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "shared/lib/store/redux";
import { selectaccomplishment } from "../../model/selectors";
import {
  showAll,
  showClosed,
  showOpened,
} from "features/TodosVisibilityFilter/model/TodosVisibilityFilterSlice";

interface FilterAccomplishmentBtnsProps {
  className?: string;
}
export const FilterAccomplishmentBtns = ({
  className,
}: FilterAccomplishmentBtnsProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const accomplishment = useAppSelector(selectaccomplishment);

  return (
    <div className={classNames(cls.FilterAccomplishmentBtns, {}, [className])}>
      <div className={classNames(cls.text, {}, [])}>
        {t("Фильтрация задач по выполнению")}
      </div>
      <Button
        type={accomplishment === "all" ? "primary" : "default"}
        className="header__filter"
        onClick={() => {
          dispatch(showAll());
        }}
      >
        {t("Все")}
      </Button>
      <Button
        type={accomplishment === "opened" ? "primary" : "default"}
        className="header__filter"
        onClick={() => {
          dispatch(showOpened());
        }}
      >
        {t("Текущие")}
      </Button>
      <Button
        type={accomplishment === "closed" ? "primary" : "default"}
        className="header__filter"
        onClick={() => {
          dispatch(showClosed());
        }}
      >
        {t("Выполненные")}
      </Button>
    </div>
  );
};
