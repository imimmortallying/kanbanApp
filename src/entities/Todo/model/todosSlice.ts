import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface Action {
  type?: string;
  id?: string;
  text?: string;
  filter?: string;
}

const initialState = [
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

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    updateTodo: (state, action) => {
      return state.map((i) => {
           if (i.id === action.payload.todoId) {
               return action.payload.newTodo
           }
           return i
       })
   },
    addTodoFromResponse: (state, action) => {
      state.push(action.payload);
    },
    clearTodosState: (state) => {
      return (state = []);
    },
    defaultTodosState: (state) => {
      console.log("defaultTodosState");
      return (state = initialState);
    },
    initTodosState: (state, action) => {
      console.log("initTodosState");
      return (state = action.payload);
    },
    // выше - работа с сервером
    add: (state, action) => {
      state.push({
        group: action.payload.group,
        id: action.payload.id,
        text: "",
        completed: false,
        importance: "not chosen",
        description: "",
      });
    },
    toggle: (state, action) => {
      state.forEach((i) => {
        if (i.id === action.payload) {
          i.completed = !i.completed;
        }
      });
    },
    remove: (state, action) => {
      state.forEach((i, index) => {
        if (i.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    changeImportance: (state, action) => {
      console.log('change')
      state.forEach((i) => {
        if (i.id === action.payload.id) {
          i.importance = action.payload.value;
        }
      });
    },
    changeTodoText: (state, action) => {
      state.forEach((i) => {
        if (i.id === action.payload.id) {
          i.text = action.payload.textareaValue;
        }
      });
    },
    removeTodoGroup: (state, action) => {
      return state.filter((i) => {
        return i.group !== action.payload;
      });
    },
    swapTodos: (state, action) => {
      const ibItem = state.find((i) => i.id === action.payload.ib);
      const iaItem = state.find((i) => i.id === action.payload.ia);

      let newState = state.map((i) => {
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
    changeDraggingTodoGroup(state, action) {
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
  clearTodosState,
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
  updateTodo
} = todosSlice.actions;
