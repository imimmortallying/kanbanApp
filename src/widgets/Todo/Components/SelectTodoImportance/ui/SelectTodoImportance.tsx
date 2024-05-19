import { Select } from "antd";
import cls from "./SelectTodoImportance.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { updateTodoRequest } from "entities/Todo/model/todoThunk";
import { changeImportance } from "entities/Todo/model/todosSlice";
import { importanceFilterInitialValue } from "entities/ImportanceFilterInitValue/ImportanceFilterInitValue";
import { useTranslation } from "react-i18next";
import { ImportanceFilterValues } from "entities/ImportanceFilterInitValue/types";

interface SelectTodoImportanceProps {
  authData: any;
  id: string;
  todo: any;
  importance: string;
}

export const SelectTodoImportance = ({
  authData,
  id,
  todo,
  importance,
}: SelectTodoImportanceProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Select
      className={cls.select}
      size="small"
      options={[
        ...importanceFilterInitialValue(t),
        { value: "not chosen", label: t("Не выбран") },
      ]}
      style={{ width: 180 }}
      onChange={(value: ImportanceFilterValues) => {
        authData === "guest"
          ? dispatch(changeImportance({ id, value }))
          : dispatch(
              updateTodoRequest({
                username: authData.username,
                newTodo: { ...todo, importance: value },
                todoId: id,
              })
            );
      }}
      value={importance === "not chosen" ? t("Выбери статус") : importance}
    />
  );
};
