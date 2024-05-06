import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import cls from "./TodoGroup.module.scss";

import { classNames } from "shared/lib/classNames/classNames";

import {
  removeTodoGroup,
  selectFilteredTodoIds,
} from "features/todosReducer/todosSlice";
import {
  changeGroupName,
  removeGroup,
} from "features/groupsReducer/groupsSlice";
import { NewTodo } from "features/NewTodo/NewTodo";
import { AddTodo } from "features/AddTodo";

import TrashIcon from "shared/assets/icons/TrashIcon.svg";

import { request_DeleteGroup } from "./services/request_DeleteGroup";
import { request_ChangeGroupName } from "./services/request_ChangeGroupName";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";
import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";

interface TodoGroupProps {
  className?: string;
  groupId?: string;
  groupName?: string;
  group: any;
}

export const TodoGroup = ({ groupId, groupName, group }: TodoGroupProps) => {
  
  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();
  
  const authData = useAppSelector(selectUserAuthData);
  const todoIds = useAppSelector(selectFilteredTodoIds);
  const todos = useAppSelector((state: any) => state.todos);
  //@ts-ignore
  const groupeTodoIds = (todoIds, todos) => {
    return todoIds.filter((todoId: any) => {
      return todos.find((todo: any) => todo.id === todoId).group === groupId;
    });
  };

  const groupedTodoIds = groupeTodoIds(todoIds, todos);

  const [inputText, setInputText] = useState(groupName);
  const handleInputChange = (e: any) => {
    setInputText(e.target.value);
  };

  const [inputEditMode, setInputEditMode] = useState(false);

  // dnd group
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: groupId,
    data: {
      type: "Group",
      group,
    },
    disabled: inputEditMode,
  });

  const style = {
    transition,
  };

  if (isDragging) {
    return (
      <div
        className={classNames(cls.TodoGroup_dragging_container, {}, [])}
        ref={setNodeRef}
        style={style}
      />
    );
  }

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
        {!inputEditMode && (
          <div
            className={classNames(cls.input_nonEditMode, {}, [])}
            onClick={() => setInputEditMode(true)}
          >
            {inputText}
          </div>
        )}

        {inputEditMode && (
          <input
            className={classNames(cls.input_editMode, {}, [])}
            value={inputText}
            autoFocus
            onChange={handleInputChange}
            onBlur={() => {
              authData !== "guest"
                ? dispatchAsync(
                    request_ChangeGroupName({
                      username: authData.username,
                      groupId,
                      newName: inputText,
                    })
                  )
                : dispatch(changeGroupName({ groupId, inputText }));
              setInputEditMode(false);
            }}
            onKeyDown={(e) => {
              if (e.key !== "Enter") return;
              authData !== "guest"
                ? dispatchAsync(
                    request_ChangeGroupName({
                      username: authData.username,
                      groupId,
                      newName: inputText,
                    })
                  )
                : dispatch(changeGroupName({ groupId, inputText }));
              setInputEditMode(false);
            }}
          />
        )}

        <button
          onClick={() => {
            authData !== "guest"
              ? dispatchAsync(
                  request_DeleteGroup({ username: authData.username, groupId })
                )
              : dispatch(removeGroup(groupId)) &&
                dispatch(removeTodoGroup(groupId));
          }}
          className={classNames(cls.remove_button, {}, [])}
        >
          {<TrashIcon className={classNames(cls.remove_icon, {}, [])} />}
        </button>
      </div>

      <div className={classNames(cls.TodoGroup_body, {}, [])}>
        <SortableContext items={groupedTodoIds}>
          {groupedTodoIds.map((id: any) => {
            return <NewTodo id={id} key={id}></NewTodo>;
          })}
        </SortableContext>
      </div>

      <div className={classNames(cls.TodoGroup_footer, {}, [])}>
        <AddTodo groupId={groupId}></AddTodo>
      </div>
    </div>
  );
};
