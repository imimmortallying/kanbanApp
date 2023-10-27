import { classNames } from "shared/lib/classNames/classNames";
import cls from "./AddTodo.module.scss"
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { add } from "features/todosReducer/todosSlice";
import { useRef } from "react";

import AddIcon from "shared/assets/icons/add-icon.svg";
import { useTranslation } from "react-i18next";

interface AddTodoProps {
    className?: string;
    groupName: string;
}

export const AddTodo = ({ className, groupName }: AddTodoProps) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    // translation 
    const { t } = useTranslation();


    return (
        // <div className={classNames(cls.AddTodo, {}, [className])}>
        <button
            className={classNames(cls.AddTodo, {}, [])}
            onClick={() => dispatch(add({ group: groupName, id: crypto.randomUUID() }))}>
            <AddIcon className={classNames(cls.AddIcon, {}, [])}></AddIcon>
            {t('Добавить задачу')}
        </button>
        // </div>
    );
};

