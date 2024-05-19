import { useTranslation } from "react-i18next";
import cls from "./AddTodo.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import AddIcon from "shared/assets/icons/add-icon.svg";
import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";
import { add } from "entities/Todo/model/todosSlice";
import { addNewTodoRequest } from "entities/Todo/model/todoThunk";
import { IGroup } from "entities/TodoGroup/types";

interface AddTodoProps {
  className?: string;
  groupId: IGroup["id"];
}

export const AddTodo = ({ groupId }: AddTodoProps) => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(selectUserAuthData);

  const { t } = useTranslation();

  return (
    <button
      className={classNames(cls.AddTodo, {}, [])}
      onClick={() => {
        authData === "guest"
          ? dispatch(add({ groupId: groupId, newTodoId: crypto.randomUUID() }))
          : dispatch(
              addNewTodoRequest({ username: authData.username, groupId })
            );
      }}
    >
      <AddIcon className={classNames(cls.AddIcon, {}, [])}></AddIcon>
      {t("Добавить задачу")}
    </button>
  );
};
