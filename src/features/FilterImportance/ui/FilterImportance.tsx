import { classNames } from "shared/lib/classNames/classNames";

import cls from "./FilterImportance.module.scss";
import { useDispatch } from "react-redux";
import { Checkbox } from "antd";
import { toggleFilter } from "features/filterReducer/visibilityFilterSlice";
import { useTranslation } from "react-i18next";
import { importanceFilterInitialValue } from "entities/ImportanceFilterInitValue/ImportanceFilterInitValue";

interface FilterImportanceProps {
  className?: string;
}
export const FilterImportance = ({ className }: FilterImportanceProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const renderedCheckboxes = importanceFilterInitialValue(t).map((el) => {
    return (
      <div className={cls.importance__elem} key={el.value}>
        <Checkbox onChange={() => dispatch(toggleFilter(el.value))} />
        <div>{el.label}</div>
      </div>
    );
  });

  return (
    <div className={classNames(cls.FilterImportance, {}, [className])}>
      <span>{t("Фильтрация задач по важности")}</span>
      {renderedCheckboxes}
    </div>
  );
};
