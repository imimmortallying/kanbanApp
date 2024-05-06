import { useState } from "react";
import { Checkbox, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./NewTodo.module.scss";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
  changeImportance,
  changeTodoText,
  remove,
  selectTodoById,
  toggle,
} from "features/todosReducer/todosSlice";

import { selectUserAuthData } from "entities/User/model/selectors/getUserAuthData/getUserAuthData";

import TrashIcon from "shared/assets/icons/TrashIcon.svg";

import { request_DeleteTodo } from "./services/request_DeleteTodo";
import { request_UpdateTodo } from "./services/request_UpdateTodo";
import { useAppDispatch, useAppSelector } from "shared/lib/store/redux";
import { importanceFilterInitialValue } from "entities/ImportanceFilterInitValue/ImportanceFilterInitValue";

interface NewTodoProps {
  className?: string;
  id: string;
}

export const NewTodo = ({ className, id }: NewTodoProps) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch();

  const authData = useAppSelector(selectUserAuthData);

  const todo = useAppSelector((state) => selectTodoById(state, id));
  const { text, completed, importance } = todo;

  // textfield
  const [textareaValue, setTextareaValue] = useState(text);
  const handleInputChange = (e: any) => {
    setTextareaValue(e.target.value);
  };

  const [inputEditMode, setInputEditMode] = useState(false);

  //dnd todo
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: "Todo",
      todo,
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
        className={classNames(cls.Todo_dragging, {}, [])}
        ref={setNodeRef}
        style={style}
      ></div>
    );
  }

  if (inputEditMode) {
    return (
      <div className={classNames(cls.NewTodo_active, {}, [className])}>
        <textarea
          value={textareaValue}
          autoFocus
          className={classNames(cls.todo_textArea_active, {}, [])}
          onChange={handleInputChange}
          onBlur={() => {
            authData !== "guest"
              ? dispatchAsync(
                  request_UpdateTodo({
                    username: authData.username,
                    newTodo: { ...todo, text: textareaValue },
                    todoId: id,
                  })
                )
              : dispatch(changeTodoText({ id, textareaValue })),
              setInputEditMode(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.shiftKey) {
              setInputEditMode(false),
                authData !== "guest"
                  ? dispatchAsync(
                      request_UpdateTodo({
                        username: authData.username,
                        newTodo: { ...todo, text: textareaValue },
                        todoId: id,
                      })
                    )
                  : dispatch(changeTodoText({ id, textareaValue }));
            }
          }}
          placeholder="Что нужно сделать?"
        ></textarea>
      </div>
    );
  }

  if (!inputEditMode) {
    return (
      <div
        //dnd todo
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        id={id}
        className={classNames(cls.NewTodo, {}, [className])}
      >
        <div className={classNames(cls.todo_options, {}, [])}>
          <Checkbox
            onChange={() => {
              authData !== "guest"
                ? dispatchAsync(
                    request_UpdateTodo({
                      username: authData.username,
                      newTodo: { ...todo, completed: !todo.completed },
                      todoId: id,
                    })
                  )
                : dispatch(toggle(id));
            }}
            checked={completed}
            className={classNames(cls.checkbox, {}, [])}
          />
          <Select
            className={classNames(cls.select, {}, [])}
            size="small"
            options={[
              ...importanceFilterInitialValue(t),
              { value: "not chosen", label: t("Не выбран") },
            ]}
            style={{ width: 180 }}
            onChange={(value) => {
              authData !== "guest"
                ? dispatchAsync(
                    request_UpdateTodo({
                      username: authData.username,
                      newTodo: { ...todo, importance: String(value) },
                      todoId: id,
                    })
                  )
                : dispatch(changeImportance({ id, value }));
            }}
            value={
              importance === "not chosen" ? t("Выбери статус") : importance
            }
          />
          <button
            onClick={() => {
              authData !== "guest"
                ? dispatchAsync(
                    request_DeleteTodo({
                      username: authData.username,
                      todoId: id,
                    })
                  )
                : dispatch(remove(id));
            }}
            className={classNames(cls.Button_remove_task, {}, [])}
          >
            {<TrashIcon className={classNames(cls.remove_icon, {}, [])} />}
          </button>
        </div>

        {/* разница в абзаце, вместо инпута, когда неактивный режим */}
        <p
          className={classNames(cls.todo_text, {}, [])}
          onClick={() => setInputEditMode(true)}
        >
          {text}
        </p>
      </div>
    );
  }
};
