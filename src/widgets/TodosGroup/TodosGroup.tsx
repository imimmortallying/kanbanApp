import React, { useState } from "react";
import cls from "./TodosGroup.module.scss";
import { AddTodo } from "features/AddTodo";
import { deleteGroupRequest } from "entities/TodoGroup/todoGroupThunk";
import { removeGroup } from "entities/TodoGroup/todoGroupSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { removeTodoGroup } from "entities/Todo/model/todosSlice";
import { InputEditMode } from "./components/InputEditMode/InputEditMode";
import { RemoveItemsButton } from "features/RemoveItemsButton/ui/RemoveItemsButton";
import { IGroup } from "entities/TodoGroup/types";
import { IUser } from "entities/User/model/slice/types";

interface TodosGroupProps {
  className?: string;
  groupId?: IGroup["id"];
  groupName?: IGroup["name"];
  authData?: IUser["authData"];
  children?: React.ReactNode;
}

export const TodosGroup = ({
  className,
  groupId,
  groupName,
  authData,
  children,
}: TodosGroupProps) => {
  const [inputEditMode, setInputEditMode] = useState(false);
  const [inputText, setInputText] = useState(groupName);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // DND
  //3
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
      group: { groupId, groupName },
    },
    disabled: inputEditMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  // тот, который рисуется под перетаскиваемым
  if (isDragging) {
    return (
      <div
        className={cls.TasksGroup_dragging_container}
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }
  // конец настройки DND

  return (
    <div className={cls.TasksGroup_container} ref={setNodeRef} style={style}>
      <div className={cls.TasksGroup_header} {...attributes} {...listeners}>
        {!inputEditMode && (
          <div
            className={cls.input_nonEditMode}
            onClick={() => setInputEditMode(true)}
          >
            {inputText}
          </div>
        )}
        {inputEditMode && (
          <InputEditMode
            authData={authData}
            groupId={groupId}
            inputEditModeSetter={setInputEditMode}
            inputValue={inputText}
            onChangeHandler={handleInputChange}
          ></InputEditMode>
        )}
        <RemoveItemsButton
          className={cls.remove_button}
          authData={authData}
          asyncAction={deleteGroupRequest({
            username:
              authData && typeof authData !== "string"
                ? authData.username
                : undefined,
            groupId,
          })}
          localAction={[removeGroup(groupId), removeTodoGroup(groupId)]}
        ></RemoveItemsButton>
      </div>

      <div className={cls.TasksGroup_body}>{children}</div>

      <div className={cls.TasksGroup_footer}>
        <AddTodo groupId={groupId}></AddTodo>
      </div>
    </div>
  );
};
