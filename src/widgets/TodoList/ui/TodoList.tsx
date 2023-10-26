import { useSelector } from "react-redux"
import { selectFilteredTodoIds } from "features/todosReducer/todosSlice"
import { classNames } from "shared/lib/classNames/classNames";
import { Todo } from "features/Todo";
import cls from "./TodoList.module.scss"


export const TodoList = () => {
    
    const todoIds = useSelector(selectFilteredTodoIds)

    const renderedListItems = todoIds.map((todoId:any) => {
        return <Todo key={todoId} id={todoId} />
    })

    return <div className={(classNames(cls.TodoList, {}, []))}>{renderedListItems}</div>
}
