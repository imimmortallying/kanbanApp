import { classNames } from "shared/lib/classNames/classNames";

import cls from "./TodoGroups.module.scss"
import { addGroup, selectGroupById, swapGroups, } from "features/groupsReducer/groupsSlice";
import { useDispatch, useSelector } from "react-redux";
import { TodoGroup } from "features/TodoGroup/TodoGroup";
import { Button } from "antd";
import { SortableContext } from "@dnd-kit/sortable";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { NewTodo } from "features/NewTodo/NewTodo";
import { changeDraggingTodoGroup, selectTodos, swapTodos } from "features/todosReducer/todosSlice";
import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "app/hooks/hooks";
import { request_AddNewGroup } from "./services/request_AddNewGroup";
import { getUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { request_SwapGroups } from "./services/request_SwapGroups";
import { request_SwapTodos } from "./services/request_SwapTodos";


interface TodoGroupsProps {
    className?: string;
}

export const TodoGroups = ({ className }: TodoGroupsProps) => {
    // юзернейм чтобы отправить на сервер
    const authData = useSelector(getUserAuthData); 

    const todos = useSelector(selectTodos);

    // i18n
    const { t } = useTranslation();

    const {theme} = useTheme();

    const groups = useSelector(selectGroupById)
    const dispatch = useDispatch();
    const dispatchAsync = useAppDispatch();

    console.log('groups', groups)

    //dnd  group

    const [activeGroup, setActiveGroup] = useState(null);

    function onDragStart(event: any) {
        if (event.active.data.current?.type === "Group") {
            setActiveGroup(event.active.data.current.group);
            // console.log(event.active.data.current.group)
            return;
        }

        if (event.active.data.current?.type === "Todo") {
            setActiveTodo(event.active.data.current.todo);
            // console.log(event.active)
        }
    }
    function onDragEnd(event: DragEndEvent) {
        // обернул тело в условие - это сохраняет от ошибки - отправки действия при переносе туду, а не группы
        setActiveGroup(null);
        setActiveTodo(null);

        if (event.active.data.current?.type === "Group" && authData) {
            dispatchAsync(request_SwapGroups({groups, username: authData.username}))
        }

        if (event.active.data.current?.type === "Todo" && authData) {
            dispatchAsync(request_SwapTodos({todos, username: authData.username}))
        }
        
        const { active, over } = event;
        if (!over) return;
        const activeGroupId = active.id;
        const overGroupId = over.id;
        if (activeGroupId === overGroupId) return;

        //! bag
        // сначала использовал эту часть, чтобы менять местами группы. Затем вынес этот код в драгОвер, т.е. срабатывание при наведении на др элемент
        // чтобы избежать бага - туду группы меняются местами, а хочу сделать так, чтобы группы сдвигались, для этого и вынес, т.к. при переносе группы
        // будет происходить action при каждом наведении на др группу. Но это скачалось на плавности отрисовки
        //     dispatch(swapGroups({ activeGroupId, overGroupId }))

    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;


        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        // !bag этот код добавил вместо (58)
        const activeGroupId = active.id;
        const overGroupId = over.id;

        if (event.active.data.current?.type === "Group") {
            dispatch(swapGroups({ activeGroupId, overGroupId }))
            console.log('123')
        }
        //

        const isActiveATask = active.data.current?.type === 'Todo';
        const isOverATask = over.data.current?.type === 'Todo';

        if (!isActiveATask) return;
        if (isActiveATask && isOverATask) {
            dispatch(swapTodos({ ia: activeId, ib: overId }))

            if (event.active.data.current.todo.group !== event.over.data.current.todo.group) {

                console.log('!!!')
                dispatch(changeDraggingTodoGroup({ activeId: activeId, newGroup: event.over.data.current.todo.group }))
                // если одну задачу держу над другой. Но почему action - changeDraggingTodo GROUP?! и зачем тут новая группа?
            }
        }

        const isOverAColumn = over.data.current?.type === 'Group';

        if (isActiveATask && isOverAColumn) {
            // console.log(over)
            dispatch(changeDraggingTodoGroup({ activeId: activeId, newGroup: over.id }))
        }

    }

    const senors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            },
        }),
    )

    //dnd todo
    const [activeTodo, setActiveTodo] = useState(null);

    return (
        <DndContext sensors={senors} onDragStart={onDragStart} onDragEnd={onDragEnd} onDragOver={onDragOver}>
            <div className={classNames(cls.TodoGroups, {}, [className])}>
                <SortableContext items={groups}>
                    {groups.map((group: any) => {
                        // для dnd добавил group={group}
                        // return <TodoGroup groupId={group.id} key={crypto.randomUUID()} groupName={group.name} group={group}></TodoGroup>
                        return <TodoGroup groupId={group.id} key={group.id} groupName={group.name} group={group}></TodoGroup>
                    })}

                    {groups.length === 0
                    ? ''
                    : <Button className={classNames(cls.newGroup_btn, {}, [className])} 
                        onClick={() => { 
                            authData
                            ? dispatchAsync(request_AddNewGroup({username: authData.username}))
                            // dispatchAsync(request_AddNewGroup({username: authData.username}))
                            : dispatch(addGroup(crypto.randomUUID())) // локальное изменение redux
                            // dispatch(addGroup(crypto.randomUUID()))
                            
                            }}>
                            {t("Новая группа")}
                    </Button>
                    }

                                        
                </SortableContext>
            </div>

                    {/* как работает ДНД портал? вставляет его в боди? позже вернись и используй свой компонент портал */}
            {createPortal(
                <DragOverlay>
                    <div className={classNames(cls.portal, {}, [theme])}>
                        {activeGroup && <TodoGroup
                            group={activeGroup}
                            groupId={activeGroup.id}
                            groupName={activeGroup.name}
                        />
                        }

                        {activeTodo && <NewTodo id={activeTodo.id} />}
                    </div>

                </DragOverlay>, document.body
            )}

        </DndContext>

    );
};