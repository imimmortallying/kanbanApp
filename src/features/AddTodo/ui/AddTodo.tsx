import { useTranslation } from "react-i18next";
import cls from "./AddTodo.module.scss";
import { classNames } from "shared/lib/classNames/classNames";
import AddIcon from "shared/assets/icons/add-icon.svg";
import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";
import { add } from "entities/Todo/model/todosSlice";
import { addNewTodoRequest } from "entities/Todo/model/todoThunk";

interface AddTodoProps {
  className?: string;
  groupId: string;
}

export const AddTodo = ({ groupId }: AddTodoProps) => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector(selectUserAuthData);
  
  // translation
  const { t } = useTranslation();

  return (
    <button
      className={classNames(cls.AddTodo, {}, [])}
      onClick={() => {
        authData !== "guest"
          ? dispatch(
              addNewTodoRequest({ username: authData.username, groupId })
            )
          : dispatch(add({ group: groupId, id: crypto.randomUUID() }));
      }}
    >
      <AddIcon className={classNames(cls.AddIcon, {}, [])}></AddIcon>
      {t("Добавить задачу")}
    </button>
  );
};
