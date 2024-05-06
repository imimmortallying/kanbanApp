import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import cls from "./AddTodo.module.scss";

import { classNames } from "shared/lib/classNames/classNames";
import AddIcon from "shared/assets/icons/add-icon.svg";

import { add } from "features/todosReducer/todosSlice";

import { request_AddNewTodo } from "../services/request_AddNewTodo";

import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";

interface AddTodoProps {
  className?: string;
  groupId: string;
}

export const AddTodo = ({ groupId }: AddTodoProps) => {
  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();
  const authData = useAppSelector(selectUserAuthData);

  // translation
  const { t } = useTranslation();

  return (
    <button
      className={classNames(cls.AddTodo, {}, [])}
      onClick={() => {
        authData !== "guest"
          ? dispatchAsync(
              request_AddNewTodo({ username: authData.username, groupId })
            )
          : dispatch(add({ group: groupId, id: crypto.randomUUID() }));
      }}
    >
      <AddIcon className={classNames(cls.AddIcon, {}, [])}></AddIcon>
      {t("Добавить задачу")}
    </button>
  );
};
