import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITodo, IUpdateTodoRequest } from "./types";
import { IGroup } from "entities/TodoGroup/types";
import { ImportanceFilterValues } from "entities/ImportanceFilterInitValue/types";

const initialLocalState: ITodo[] = [
  {
    group: "group1",
    text: "Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная). Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры.",
    id: "1",
    completed: true,
    importance: "not chosen",
  },
  {
    group: "group1",
    text: "Сходить на рынок",
    id: "2",
    completed: true,
    importance: "not chosen",
  },
  {
    group: "group2",
    text: "Убраться на столе",
    id: "3",
    completed: true,
    importance: "not chosen",
  },
  {
    group: "group2",
    text: "Позвонить брату",
    id: "4",
    completed: true,
    importance: "not chosen",
  },
  {
    group: "group3",
    text: "Убраться в комнате",
    id: "5",
    completed: true,
    importance: "not chosen",
  },
  {
    group: "group3",
    text: "Поставить чайник",
    id: "6",
    completed: true,
    importance: "not chosen",
  },
];

const initialState: ITodo[] = [];

export const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    updateTodo: (state, action: PayloadAction<IUpdateTodoRequest>) => {
      return state.map((i) => {
        if (i.id === action.payload.todoId) {
          return action.payload.newTodo;
        }
        return i;
      });
    },
    addTodoFromResponse: (state, action: PayloadAction<ITodo>) => {
      state.push(action.payload);
    },
    defaultTodosState: () => {
      return initialLocalState;
    },
    initTodosState: (state, action: PayloadAction<ITodo[]>) => {
      return (state = action.payload);
    },
    add: (
      state,
      action: PayloadAction<{ groupId: IGroup["id"]; newTodoId: ITodo["id"] }>
    ) => {
      state.push({
        group: action.payload.groupId,
        id: action.payload.newTodoId,
        text: "",
        completed: false,
        importance: "not chosen",
      });
    },
    toggle: (state, action: PayloadAction<ITodo["id"]>) => {
      state.forEach((i) => {
        if (i.id === action.payload) {
          i.completed = !i.completed;
        }
      });
    },
    remove: (state, action: PayloadAction<ITodo["id"]>) => {
      state.forEach((i, index) => {
        if (i.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    changeImportance: (
      state,
      action: PayloadAction<{ id: ITodo["id"]; value: ImportanceFilterValues }>
    ) => {
      state.forEach((i) => {
        if (i.id === action.payload.id) {
          i.importance = action.payload.value;
        }
      });
    },
    changeTodoText: (
      state,
      action: PayloadAction<{ id: ITodo["id"]; textareaValue: ITodo["text"] }>
    ) => {
      state.forEach((i) => {
        if (i.id === action.payload.id) {
          i.text = action.payload.textareaValue;
        }
      });
    },
    removeTodoGroup: (state, action: PayloadAction<IGroup["id"]>) => {
      return state.filter((i) => {
        return i.group !== action.payload;
      });
    },
    swapTodos: (
      state,
      action: PayloadAction<{ ia: ITodo["id"]; ib: ITodo["id"] }>
    ) => {
      const ibItem = state.find((i) => i.id === action.payload.ib);
      const iaItem = state.find((i) => i.id === action.payload.ia);

      const newState = state.map((i) => {
        if (i.id === action.payload.ia) {
          return ibItem;
        }
        if (i.id === action.payload.ib) {
          return iaItem;
        }
        return i;
      });
      return newState;
    },
    changeDraggingTodoGroup(
      state,
      action: PayloadAction<{ activeId: IGroup["id"]; newGroup: IGroup["id"] }>
    ) {
      state.forEach((i) => {
        if (i.id === action.payload.activeId) {
          i.group = action.payload.newGroup;
        }
      });
    },
  },
});

export default todosSlice.reducer;
export const {
  add,
  toggle,
  remove,
  changeImportance,
  removeTodoGroup,
  changeTodoText,
  swapTodos,
  changeDraggingTodoGroup,
  initTodosState,
  addTodoFromResponse,
  defaultTodosState,
  updateTodo,
} = todosSlice.actions;
