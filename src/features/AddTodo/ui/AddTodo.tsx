import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AddTodo.module.scss"
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { add } from "features/todosReducer/todosSlice";
import { useRef } from "react";

import AddIcon from "shared/assets/icons/add-icon.svg";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "app/hooks/hooks";
import { request_AddNewTodo } from "../services/request_AddNewTodo";
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";

interface AddTodoProps {
    className?: string;
    groupId: string;
}

export const AddTodo = ({ className, groupId }: AddTodoProps) => {
    const dispatch = useDispatch();
    const dispatchAsync = useAppDispatch();
    const inputRef = useRef(null);

    const authData = useSelector(getUserAuthData)

    // translation 
    const { t } = useTranslation();


    return (
        // <div className={classNames(cls.AddTodo, {}, [className])}>
        <button
            className={classNames(cls.AddTodo, {}, [])}
            onClick={() => {
                authData
                ? dispatchAsync(request_AddNewTodo({username: authData.username, groupId}))
                : dispatch(add({ group: groupId, id: crypto.randomUUID() }))
            
            }
            }>
            <AddIcon className={classNames(cls.AddIcon, {}, [])}></AddIcon>
            {t('Добавить задачу')}
        </button>
        // </div>
    );
};

