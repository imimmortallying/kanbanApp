import { Checkbox } from "antd";
import cls from "./ToggleTodoCompletion.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { updateTodoRequest } from "entities/Todo/model/todoThunk";
import { toggle } from "entities/Todo/model/todosSlice";

interface ToggleTodoCompletionProps {
  className?: string;
  authData: any;
  id: string;
  todo: any;
  completed: boolean;
}

export const ToggleTodoCompletion = ({
  className,
  authData,
  id,
  todo,
  completed,
}: ToggleTodoCompletionProps) => {

    const dispatch = useAppDispatch();
    
  return (
    <Checkbox
      onChange={() => {
        authData !== "guest"
          ? dispatch(
              updateTodoRequest({
                username: authData.username,
                newTodo: { ...todo, completed: !todo.completed },
                todoId: id,
              })
            )
          : dispatch(toggle(id));
      }}
      checked={completed}
      className={cls.checkbox}
    />
  );
};
