import { useTranslation } from "react-i18next";

import { classNames } from "shared/lib/classNames/classNames";

import cls from "./LangSwitcher.module.scss";

export const LangSwitcher = () => {
  const { i18n } = useTranslation();
  const toggle = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };
  return (
    <button
      onClick={toggle}
      className={classNames(cls.ThemeSwitcher, {
        [cls.active]: i18n.language === "en",
      })}
    >
      <div className={classNames(cls.Text, {})}>RU</div>
      <div className={classNames(cls.Text, {})}>ENG</div>
    </button>
  );
};
