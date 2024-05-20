import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/ReduxStore/store";
import { IFindingString } from "features/FindTodo/model/types";
import { IVisibilityFilter } from "features/TodosVisibilityFilter/model/types";
import { GroupedAndFiltredTodos, ITodo } from "./types";

export const selectTodos = (state: RootState) => state.todos;

export const selectTodoById = (state: RootState, todoId: ITodo["id"]) => {
  return state.todos.find((todo: ITodo) => todo.id === todoId);
};

export const selectFilteredTodos = createSelector(
  (state) => state.todos,
  (state) => state.visibilityFilter.accomplishment,
  (state) => state.visibilityFilter.importance,

  (
    todos: ITodo[],
    accomplishment: IVisibilityFilter["accomplishment"],
    importance: IVisibilityFilter["importance"]
  ) => {
    if (accomplishment === "all" && importance.length === 0) {
      return todos;
    }
    const completedStatus = accomplishment === "closed";
    return todos.filter((todo) => {
      const statusMatches =
        accomplishment === "all" || todo.completed === completedStatus;
      const importanceMatches =
        importance.length === 0 || importance.includes(todo.importance);
      return statusMatches && importanceMatches;
    });
  }
);

export const selectFindedTodos = createSelector(
  (state) => state.findingString,
  selectFilteredTodos,
  (findingString: IFindingString, selectFilteredTodos: ITodo[]) =>
    selectFilteredTodos.filter((item) => {
      return item.text.includes(findingString);
    })
);

export const selectFindedAndFilteredTodoIds = createSelector(
  selectFindedTodos,
  (filteredTodos) => filteredTodos.map((todo: ITodo) => todo.id)
);

export const selectGroupedAndFiltredTodos = createSelector(
  (state: RootState) => state,
  selectFindedTodos,
  (state, selectFindedTodos) => {
    const groupedTodos: GroupedAndFiltredTodos = {};
    for (const group of state.groups) {
      if (groupedTodos[group.id] === undefined)
        groupedTodos[group.id] = {
          groupId: group.id,
          groupName: group.name,
          todos: [],
        };
    }

    for (const todo of selectFindedTodos) {
      groupedTodos[todo.group]?.todos.push(todo.id);
    }
    //объект в массив
    return Object.values(groupedTodos);
  }
);
