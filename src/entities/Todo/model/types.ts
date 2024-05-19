import { ImportanceFilterValues } from "entities/ImportanceFilterInitValue/types";
import { IGroup } from "entities/TodoGroup/types";
import { IUserAuthData } from "entities/User/model/slice/types";

export interface ITodo {
  group: string;
  id: string;
  text: string;
  completed: boolean;
  importance: ImportanceFilterValues;
}

export type GroupedAndFiltredTodos = {
  [key: string]: {
    groupId: IGroup["id"];
    groupName: IGroup["name"];
    todos: ITodo["id"][];
  };
};

export interface IUpdateTodoRequest {
  username: IUserAuthData["username"];
  newTodo: ITodo;
  todoId: ITodo["id"];
}
