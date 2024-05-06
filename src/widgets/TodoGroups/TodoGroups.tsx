import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";

import { SortableContext } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Button } from "antd";
import cls from "./TodoGroups.module.scss";

import { classNames } from "shared/lib/classNames/classNames";

import {
  addGroup,
  selectGroupById,
  swapGroups,
} from "features/groupsReducer/groupsSlice";
import { TodoGroup } from "features/TodoGroup/TodoGroup";
import { NewTodo } from "features/NewTodo/NewTodo";
import {
  changeDraggingTodoGroup,
  selectTodos,
  swapTodos,
} from "features/todosReducer/todosSlice";

import { useTheme } from "app/providers/ThemeProvider/useTheme";
import { request_AddNewGroup } from "./services/request_AddNewGroup";
import { request_SwapGroups } from "./services/request_SwapGroups";
import { request_SwapTodos } from "./services/request_SwapTodos";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";
import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";

interface TodoGroupsProps {
  className?: string;
}

export const TodoGroups = ({ className }: TodoGroupsProps) => {
  //context values
  const { t } = useTranslation();
  const { theme } = useTheme();

  //redux
  const authData = useAppSelector(selectUserAuthData);
  const todos = useAppSelector(selectTodos);
  const groups = useAppSelector(selectGroupById);
  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  //dnd  group
  const [activeGroup, setActiveGroup] = useState(null);

  function onDragStart(event: any) {
    if (event.active.data.current?.type === "Group") {
      setActiveGroup(event.active.data.current.group);
      return;
    }

    if (event.active.data.current?.type === "Todo") {
      setActiveTodo(event.active.data.current.todo);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveGroup(null);
    setActiveTodo(null);

    if (event.active.data.current?.type === "Group" && authData !== "guest") {
      dispatchAsync(
        request_SwapGroups({ groups, username: authData.username })
      );
    }

    if (event.active.data.current?.type === "Todo" && authData !== "guest") {
      dispatchAsync(request_SwapTodos({ todos, username: authData.username }));
    }

    const { active, over } = event;
    if (!over) return;
    const activeGroupId = active.id;
    const overGroupId = over.id;
    if (activeGroupId === overGroupId) return;
  }

  function onDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeGroupId = active.id;
    const overGroupId = over.id;

    if (event.active.data.current?.type === "Group") {
      dispatch(swapGroups({ activeGroupId, overGroupId }));
    }

    const isActiveATask = active.data.current?.type === "Todo";
    const isOverATask = over.data.current?.type === "Todo";

    if (!isActiveATask) return;
    if (isActiveATask && isOverATask) {
      dispatch(swapTodos({ ia: activeId, ib: overId }));

      if (
        event.active.data.current.todo.group !==
        event.over.data.current.todo.group
      ) {
        dispatch(
          changeDraggingTodoGroup({
            activeId: activeId,
            newGroup: event.over.data.current.todo.group,
          })
        );
      }
    }

    const isOverAColumn = over.data.current?.type === "Group";

    if (isActiveATask && isOverAColumn) {
      dispatch(
        changeDraggingTodoGroup({ activeId: activeId, newGroup: over.id })
      );
    }
  }

  const senors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  //dnd todo
  const [activeTodo, setActiveTodo] = useState(null);

  return (
    <DndContext
      sensors={senors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className={classNames(cls.TodoGroups, {}, [className])}>
        <SortableContext items={groups}>
          {groups.map((group: any) => {
            return (
              <TodoGroup
                groupId={group.id}
                key={group.id}
                groupName={group.name}
                group={group}
              ></TodoGroup>
            );
          })}

          {groups.length === 0 ? (
            ""
          ) : (
            <Button
              className={classNames(cls.newGroup_btn, {}, [className])}
              onClick={() => {
                authData !== "guest"
                  ? dispatchAsync(
                      request_AddNewGroup({ username: authData.username })
                    )
                  : dispatch(addGroup(crypto.randomUUID())); // локальное изменение redux
              }}
            >
              {t("Новая группа")}
            </Button>
          )}
        </SortableContext>
      </div>

      {createPortal(
        <DragOverlay>
          <div className={classNames(cls.portal, {}, [theme])}>
            {activeGroup && (
              <TodoGroup
                group={activeGroup}
                groupId={activeGroup.id}
                groupName={activeGroup.name}
              />
            )}

            {activeTodo && <NewTodo id={activeTodo.id} />}
          </div>
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
