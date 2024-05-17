import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: "group1", name: "group1" },
  { id: "group2", name: "group2" },
  { id: "group3", name: "group3" },
];

export const groupsSlice = createSlice({
  name: "groups",
  initialState: [],
  reducers: {
    changeGroupNameFromResponse: (state, action) => {
      state.forEach((i) => {
        if (i.id === action.payload.groupId) {
          i.name = action.payload.currentGroupName;
        }
      });
    },
    swapGroupsFromResponse: (state, action) => {
      console.log('swap slice')
      if (state != action.payload) {
        return (state = action.payload);
      }
      return;
    },
    removeGroupFromResponse: (state, action) => {
      state.map((i, index) => {
        if (i.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    addGroupFromResponse: (state, action) => {
      state.push({ name: action.payload.name, id: action.payload.id });
    },
    clearGroupsState: (state) => {
      return (state = []);
    },
    defaultGroupsState: (state) => {
      console.log("defaultGroupsState");
      return (state = initialState);
    },
    initGroupsState: (state, action) => {
      console.log("initGroupsState");
      return (state = action.payload);
    },
    // выше - работа с сервером
    addGroup: (state, action) => {
      state.push({ name: "new group", id: action.payload });
    },
    removeGroup: (state, action) => {
      state.map((i, index) => {
        if (i.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    changeGroupName: (state, action) => {
      state.forEach((i) => {
        if (i.id === action.payload.groupId) {
          i.name = action.payload.inputText;
        }
      });
    },
    swapGroups: (state, action) => {
      const ibItem = state.find((i) => i.id === action.payload.overGroupId);
      const iaItem = state.find((i) => i.id === action.payload.activeGroupId);

      let newState = state.map((i) => {
        if (i.id === action.payload.activeGroupId) {
          return ibItem;
        }
        if (i.id === action.payload.overGroupId) {
          return iaItem;
        }
        return i;
      });
      return newState;
    },
  },
});

export default groupsSlice.reducer;
export const {
  addGroup,
  removeGroup,
  changeGroupName,
  swapGroups,
  initGroupsState,
  clearGroupsState,
  addGroupFromResponse,
  removeGroupFromResponse,
  swapGroupsFromResponse,
  changeGroupNameFromResponse,
  defaultGroupsState,
} = groupsSlice.actions;
