import {
  FC,
  ReactNode,
  useState,
  useEffect,
} from "react";

import cls from "./MainPage.module.scss";
import { ConfigProvider } from "antd";

import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";
import { userActions } from "entities/User/model/slice/userSlice";
import { Header } from "widgets/Header/Header";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";
import { TodosGroup } from "widgets/TodosGroup/TodosGroup";
import {
  selectGroupedAndFiltredTodos,
  selectTodos,
} from "entities/Todo/model/selectors";
import { AllGroups } from "widgets/AllGroups/AllGroups";

import { SortableContext } from "@dnd-kit/sortable";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { selectGroups, selectGroupsIds } from "entities/TodoGroup/selectors";
import {
  defaultGroupsState,
  swapGroups,
} from "entities/TodoGroup/todoGroupSlice";
import {
  changeDraggingTodoGroup,
  defaultTodosState,
  swapTodos,
} from "entities/Todo/model/todosSlice";
import { classNames } from "shared/lib/classNames/classNames";
import { createPortal } from "react-dom";
import {
  InitReduxByToken,
  swapTodosRequest,
} from "entities/Todo/model/todoThunk";
import { swapGroupsRequest } from "entities/TodoGroup/todoGroupThunk";
import { useTheme } from "shared/lib/ThemeProvider/useTheme";
import { Todo } from "widgets/Todo/Todo";

interface MainPageProps {
  className?: string;
  children?: ReactNode;
}

export const MainPage: FC<MainPageProps> = () => {
  console.log("render");
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const authData = useAppSelector(selectUserAuthData);
  const groupedAndFiltredTodos = useAppSelector(selectGroupedAndFiltredTodos);

  useEffect(() => {
    console.log("first effect");
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  useEffect(() => {
    console.log("second effect");
    if (authData) {
      if (authData === "guest") {
        dispatch(defaultGroupsState());
        dispatch(defaultTodosState());
      } else {
        dispatch(
          InitReduxByToken({
            username: authData.username,
            password: authData.password,
          })
        );
      }
    }
  }, [authData]);

  //refactoring
  // создал новый компонент - widgets/TasksGroup взамен TodoGroup, чтобы переписать его заново, избавившись от лишней
  // ответственности и связности
  //DND
  //1 оберунть в dnd context
  //2 добавить sortable context, обернуть им то, что будем таскать, передать items в виде id (groupsIds)
  const groupsIds = useAppSelector(selectGroupsIds);

  //3 сделать колонку dragable. внутри группы useSortable hook. Добавить style
  // style обязательно, или не будут двигаться колонки
  // spread ... attribytes listeners туда, за что будем хвататься, чтобы тащить

  //4 dragoverlay. В main page добавить ф-ии onDragStart и т.д
  // Добавить const [activeGroup, setActiveGroup] = useState(null); чтобы определить, что именно тащим

  const [activeGroup, setActiveGroup] = useState(null);
  const [activeTodo, setActiveTodo] = useState(null);

  // добавил группу, чтобы работали onDragEnd
  const groups = useAppSelector(selectGroups);
  const todos = useAppSelector(selectTodos);

  function onDragStart(event: DragStartEvent) {
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
      dispatch(swapGroupsRequest({ groups, username: authData.username }));
    }

    if (event.active.data.current?.type === "Todo" && authData !== "guest") {
      dispatch(swapTodosRequest({ todos, username: authData.username }));
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

  //5 в mainPage добавить dragOverlay, чтобы компонент оставался на месте, а тащимый рисовался через портал
  // чтоюы отрисовать внутри перетаскиваемой группы тудушки пришлось также через чилдрен передать туду айди

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#FAAD14",
          fontFamily: 'Consolas, "Times New Roman", Serif',
          fontSize: 16,
        },
      }}
    >
      <div className={cls.MainPage}>
        <Header></Header>

        <DndContext
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDragEnd={onDragEnd}
          sensors={senors}
        >
          <AllGroups authData={authData}>
            <SortableContext items={groupsIds}>
              {groupedAndFiltredTodos.map((group: any) => {
                return (
                  <TodosGroup
                    authData={authData}
                    groupId={group.groupId}
                    groupName={group.groupName}
                    key={group.groupId}
                  >
                    <SortableContext items={group.todos}>
                      {group.todos.map((todoId: any) => (
                        <Todo
                          id={todoId}
                          key={todoId}
                          authData={authData}
                        ></Todo>
                      ))}
                    </SortableContext>
                  </TodosGroup>
                );
              })}
            </SortableContext>
          </AllGroups>

          {createPortal(
            <DragOverlay>
              <div className={classNames(cls.portal, {}, [theme])}>
                {activeGroup && (
                  <TodosGroup
                    groupId={activeGroup.groupId}
                    groupName={activeGroup.groupName}
                  >
                    {groupedAndFiltredTodos
                      .find((group) => group.groupId === activeGroup.groupId)
                      .todos?.map((todoId: any) => (
                        <Todo id={todoId} key={todoId}></Todo>
                      ))}
                  </TodosGroup>
                )}
                {activeTodo && <Todo id={activeTodo.id} />}
              </div>
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      </div>
    </ConfigProvider>
  );
};
