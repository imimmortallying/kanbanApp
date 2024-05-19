import { createSlice } from "@reduxjs/toolkit";
import { IVisibilityFilter } from "./types";

const initialState: IVisibilityFilter = {
  accomplishment: "all",
  importance: [],
};

export const visibilityFilterSlice = createSlice({
  name: "visibilityFilter",
  initialState: initialState,
  reducers: {
    showAll: (state) => {
      state.accomplishment = "all";
    },
    showClosed: (state) => {
      state.accomplishment = "closed";
    },
    showOpened: (state) => {
      state.accomplishment = "opened";
    },
    toggleFilter: (state, action) => {
      if (state.importance.includes(action.payload)) {
        state.importance.forEach((i, index) => {
          if (i === action.payload) {
            state.importance.splice(index, 1);
          }
        });
      } else state.importance.push(action.payload);
    },
  },
});

export const { showAll, showClosed, showOpened, toggleFilter } =
  visibilityFilterSlice.actions;
export default visibilityFilterSlice.reducer;
