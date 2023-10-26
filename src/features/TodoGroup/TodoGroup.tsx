import { classNames } from "shared/lib/classNames/classNames";
import { removeTodoGroup, selectFilteredTodoIds, selectFilteredTodos, swapTodos } from "features/todosReducer/todosSlice";

import cls from "./TodoGroup.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { NewTodo } from "features/NewTodo/NewTodo";
import { AddTodo } from "features/AddTodo";
import { Button, Input } from "antd";
import { changeGroupName, removeGroup } from "features/groupsReducer/groupsSlice";
import { useState } from "react";
import TrashIcon from "shared/assets/icons/TrashIcon.svg";
import { createSelector } from "reselect";

import { CSS } from "@dnd-kit/utilities"
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";


//icons 

interface TodoGroupProps {
    className?: string;
    groupId?: string;
    groupName?: string;
    group: any;
}

export const TodoGroup = ({ className, groupId, groupName, group }: TodoGroupProps) => {

    const dispatch = useDispatch();

    const todoIds = useSelector(selectFilteredTodoIds)
    const todos = useSelector(((state: any) => state.todos))
    //@ts-ignore
    const groupeTodoIds = (todoIds, todos) => {
        return todoIds.filter((todoId: any) => {
            return todos.find((todo: any) => todo.id === todoId).group === groupId
        })
    }

    const groupedTodoIds = groupeTodoIds(todoIds, todos)

    const [inputText, setInputText] = useState(groupName);
    const handleInputChange = (e: any) => {
        setInputText(e.target.value)
    }

    const [inputEditMode, setInputEditMode] = useState(false)

    // dnd group
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: groupId,
        data: {
            type: 'Group',
            group,
        },
        disabled: inputEditMode
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    };

    if (isDragging) {
        return <div
            className={classNames(cls.TodoGroup_dragging_container, {}, [])}
            ref={setNodeRef}
            style={style}
        />
    }
    //dnd todo








    return (

        <div
            className={classNames(cls.TodoGroup_container, {}, [])}
            ref={setNodeRef}
            style={style}
        >

            <div
                className={classNames(cls.TodoGroup_header, {}, [])}
                {...attributes}
                {...listeners}
            >
                {/* или див с текстом, или при нажатии на див - инпут для изменения текста */}
                {!inputEditMode && (<div
                    className={classNames(cls.input_nonEditMode, {}, [])}
                    onClick={() => setInputEditMode(true)}>
                    {inputText}
                </div>)}

                {inputEditMode && (<input
                    className={classNames(cls.input_editMode, {}, [])}
                    value={inputText}
                    autoFocus
                    onChange={handleInputChange}
                    // onClick={()=>setInputEditMode(true)}
                    onBlur={() => {
                        dispatch(changeGroupName({ groupId, inputText }))
                        setInputEditMode(false)
                    }}
                    onKeyDown={(e) => {
                        if (e.key !== "Enter") return;
                        setInputEditMode(false);
                    }}

                />)}


                <button
                    onClick={() => { dispatch(removeGroup(groupId)), dispatch(removeTodoGroup(groupId)) }}
                    className={classNames(cls.remove_button, {}, [])}
                >
                    {<TrashIcon className={classNames(cls.remove_icon, {}, [])}/>}
                </button>
            </div>

            <div
                className={classNames(cls.TodoGroup_body, {}, [])}

            >

                <SortableContext items={groupedTodoIds}>
                    {groupedTodoIds.map((id: any) => {
                        return <NewTodo id={id} key={id} ></NewTodo>
                    })}
                </SortableContext>

            </div>

            <div className={classNames(cls.TodoGroup_footer, {}, [])}>

                <AddTodo groupName={groupId}></AddTodo>

            </div>

        </div>



    );
};