import cls from "./FindTodo.module.scss";
import { Input } from "antd";
import { ComponentProps, useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { classNames } from "shared/lib/classNames/classNames";
import { updateFindingString } from "../model/findSlice";


interface FindTodoProps {
  className?: string;
}

export const FindTodo = ({ className }: FindTodoProps) => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [findingStr, setFindingStr] = useState("");
  
  type InputProps = ComponentProps<"input">["onChange"];
  const handleInputChange: InputProps = (e) => {
    setFindingStr(e.target.value);
    dispatch(updateFindingString(e.target.value));
  };

  return (
    <div className={classNames(cls.FindTodo, {}, [className])}>
      {t("Поиск")}
      <Input onChange={handleInputChange} value={findingStr}></Input>
    </div>
  );
};
