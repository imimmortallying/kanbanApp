import { Checkbox } from "antd";
import cls from "./ToggleTodoCompletion.module.scss";
import { useAppDispatch } from "shared/lib/store/redux";
import { updateTodoRequest } from "entities/Todo/model/todoThunk";
import { toggle } from "entities/Todo/model/todosSlice";
import { IUser } from "entities/User/model/slice/types";
import { ITodo } from "entities/Todo/model/types";

interface ToggleTodoCompletionProps {
  className?: string;
  authData: IUser["authData"];
  id: ITodo["id"];
  todo: ITodo;
  completed: ITodo['completed'];
}

export const ToggleTodoCompletion = ({
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
