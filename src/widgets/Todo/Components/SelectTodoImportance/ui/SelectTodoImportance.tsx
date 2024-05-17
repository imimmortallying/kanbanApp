import { Checkbox, Select } from "antd";
import cls from "./SelectTodoImportance.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { updateTodoRequest } from "entities/Todo/model/todoThunk";
import { changeImportance, toggle } from "entities/Todo/model/todosSlice";
import { importanceFilterInitialValue } from "entities/ImportanceFilterInitValue/ImportanceFilterInitValue";
import { useTranslation } from "react-i18next";

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
      onChange={(value) => {
        authData !== "guest"
          ? dispatch(
              updateTodoRequest({
                username: authData.username,
                newTodo: { ...todo, importance: String(value) },
                todoId: id,
              })
            )
          : dispatch(changeImportance({ id, value }));
      }}
      value={importance === "not chosen" ? t("Выбери статус") : importance}
    />
  );
};
