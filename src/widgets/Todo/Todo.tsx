import { useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Todo.module.scss";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { useAppSelector } from "shared/lib/store/redux";
import { selectTodoById } from "entities/Todo/model/selectors";
import { deleteTodoRequest } from "entities/Todo/model/todoThunk";
import { remove } from "entities/Todo/model/todosSlice";
import { TodoTextareaEditMode } from "./Components/ChangeTodoText/ui/TodoTextareaEditMode";
import { ToggleTodoCompletion } from "./Components/ToggleTodoCompletion/ui/ToggleTodoCompletion";
import { SelectTodoImportance } from "./Components/SelectTodoImportance/ui/SelectTodoImportance";
import { RemoveItemsButton } from "features/RemoveItemsButton/ui/RemoveItemsButton";

interface TodoProps {
  authData?: any;
  id: string;
}

export const Todo = ({ id, authData }: TodoProps) => {
  const todo = useAppSelector((state) => selectTodoById(state, id));

  const { text, completed, importance } = todo;

  const [inputEditMode, setInputEditMode] = useState(false);

  //настройка DND
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    // это то, что передастся в onDragStart и т.д ф-ии
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
      <div className={cls.Todo_dragging} ref={setNodeRef} style={style}></div>
    );
  }
  // конец настройки DND

  // режим редактирования текста туду при нажатии на него
  if (inputEditMode) {
    return (
      <TodoTextareaEditMode
        authData={authData}
        id={id}
        setInputEditMode={setInputEditMode}
        text={text}
        todo={todo}
        className={cls.Task_edited}
      />
    );
  }

  if (!inputEditMode) {
    return (
      <div
        // ref, style, {...attributes}, {...listeners} это DND атрибуты, которые передаются туда, где можно будет взяться
        ref={setNodeRef}
        // style={style}
        {...attributes}
        {...listeners}
        id={id}
        className={cls.Task}
      >
        <div className={classNames(cls.todo_options, {}, [])}>
          <ToggleTodoCompletion
            authData={authData}
            completed={completed}
            id={id}
            todo={todo}
          />
          <SelectTodoImportance
            authData={authData}
            id={id}
            todo={todo}
            importance={importance}
          />
          <RemoveItemsButton
            className={cls.Button_remove_task}
            authData={authData}
            asyncAction={deleteTodoRequest({
              username: authData?.username,
              todoId: id,
            })}
            localAction={remove(id)}
          />
        </div>

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
