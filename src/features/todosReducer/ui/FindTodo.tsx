import { classNames } from "shared/lib/classNames/classNames";

import cls from "./FindTodo.module.scss"
import { Input } from "antd";
import { useState } from "react";
import { updateFindingString } from "features/findReducer/findSlice";
import { useDispatch } from "react-redux";

//! почему компонент находится внутри todosReducer???

interface FindTodoProps {
    className?: string;
}

const exmpData = [
    {text: 'str', id: 1},
    {text: 'strdsfsdf dfsd dfs', id: 2},
    {text: 'hello hi how are yous', id: 3},
    {text: 'hello hi how are you', id: 4},
]


let findObj = (array: any, string:string) => {
    return array.filter((item:any) => {
        return item.text.split(' ').find((str:any)=>str.includes(string))

    })
}
console.log(findObj(exmpData, 'yous'))

export const FindTodo = ({className}:FindTodoProps) => {

    const dispatch = useDispatch();

    const [findingStr, setFindingStr] = useState('')

    const handleInputChange = (e: any) => {
        let newStr = e.target.value //! пляски с мутацией, разобраться в обновлении state!
        setFindingStr(newStr)
        dispatch(updateFindingString(newStr)) //! как в этот момент отправить актуальное значение local state?
        console.log(findingStr)
    }

    return (
        <div className={classNames(cls.FindTodo, {}, [className])}>
            Поиск
            <Input 
            onChange={handleInputChange}
            value={findingStr} 
            >

            </Input>
        </div>
    );
};