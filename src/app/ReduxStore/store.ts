import { configureStore } from "@reduxjs/toolkit";
import visibilityFilter from "features/TodosVisibilityFilter/model/TodosVisibilityFilterSlice";
import findingString from "features/FindTodo/model/findSlice";
import todos from "entities/Todo/model/todosSlice";
import groups from "entities/TodoGroup/todoGroupSlice";
import login from "features/AuthByUsername/model/slice/loginSlice";
import registration from "features/AuthByUsername/model/slice/RegisterSlice";
import user from "entities/User/model/slice/userSlice";

export const store = configureStore({
  reducer: {
    todos: todos,
    visibilityFilter: visibilityFilter,
    findingString: findingString,
    groups: groups,
    login: login,
    user: user,
    registration: registration,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
