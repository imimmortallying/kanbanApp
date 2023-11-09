import { classNames } from "shared/lib/classNames/classNames";

import cls from "./FindTodo.module.scss"
import { Input } from "antd";
import { useState } from "react";
import { updateFindingString } from "features/findReducer/findSlice";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

//! почему компонент находится внутри todosReducer???

interface FindTodoProps {
    className?: string;
}


export const FindTodo = ({className}:FindTodoProps) => {

    const dispatch = useDispatch();

    const { t } = useTranslation();

    const [findingStr, setFindingStr] = useState('')

    const handleInputChange = (e: any) => {
        let newStr = e.target.value //! пляски с мутацией, разобраться в обновлении state!
        setFindingStr(newStr)
        dispatch(updateFindingString(newStr)) //! как в этот момент отправить актуальное значение local state?
        console.log(findingStr)
    }

    return (
        <div className={classNames(cls.FindTodo, {}, [className])}>
            {t('Поиск')}
            <Input 
            onChange={handleInputChange}
            value={findingStr} 
            >

            </Input>
        </div>
    );
};