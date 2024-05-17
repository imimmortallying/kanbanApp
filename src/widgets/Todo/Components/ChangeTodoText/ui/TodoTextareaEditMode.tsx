import { useState } from "react";
import cls from "./TodoTextareaEditMode.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { updateTodoRequest } from "entities/Todo/model/todoThunk";
import { changeTodoText } from "entities/Todo/model/todosSlice";
import { classNames } from "shared/lib/classNames/classNames";

interface TodoTextareaEditModeProps {
  authData: any;
  id: string;
  todo: any;
  text: string;
  className?: string;
  setInputEditMode: (arg: boolean) => void;
}

export const TodoTextareaEditMode = ({
  authData,
  id,
  todo,
  text,
  className,
  setInputEditMode,
}: TodoTextareaEditModeProps) => {
  const dispatch = useAppDispatch();

  const [textareaValue, setTextareaValue] = useState(text);
  const handleInputChange = (e: any) => {
    setTextareaValue(e.target.value);
  };

  return (
    <div className={classNames("", {}, [className])}>
      <textarea
        value={textareaValue}
        autoFocus
        className={cls.todo_textArea_active}
        onChange={handleInputChange}
        onBlur={() => {
          authData === "guest"
            ? dispatch(changeTodoText({ id, textareaValue }))
            : dispatch(
                updateTodoRequest({
                  username: authData.username,
                  newTodo: { ...todo, text: textareaValue },
                  todoId: id,
                })
              );
          setInputEditMode(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && e.shiftKey) {
            setInputEditMode(false),
              authData === "guest"
                ? dispatch(changeTodoText({ id, textareaValue }))
                : dispatch(
                    updateTodoRequest({
                      username: authData.username,
                      newTodo: { ...todo, text: textareaValue },
                      todoId: id,
                    })
                  );
          }
        }}
        placeholder="Что нужно сделать?"
      ></textarea>
    </div>
  );
};
