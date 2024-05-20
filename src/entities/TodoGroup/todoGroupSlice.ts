import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IGroup } from "./types";

const initialLocalState: IGroup[] = [
  { id: "group1", name: "group1" },
  { id: "group2", name: "group2" },
  { id: "group3", name: "group3" },
];

const initialState: IGroup[] = [];

export const groupsSlice = createSlice({
  name: "groups",
  initialState: initialState,
  reducers: {
    changeGroupNameFromResponse: (
      state,
      action: PayloadAction<{
        groupId: IGroup["id"];
        currentGroupName: IGroup["id"];
      }>
    ) => {
      state.forEach((i) => {
        if (i.id === action.payload.groupId) {
          i.name = action.payload.currentGroupName;
        }
      });
    },
    swapGroupsFromResponse: (state, action: PayloadAction<IGroup[]>) => {
      if (state != action.payload) {
        return (state = action.payload);
      }
      return;
    },
    removeGroupFromResponse: (state, action: PayloadAction<IGroup["id"]>) => {
      state.map((i, index) => {
        if (i.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    addGroupFromResponse: (
      state,
      action: PayloadAction<{ name: IGroup["name"]; id: IGroup["id"] }>
    ) => {
      state.push({ name: action.payload.name, id: action.payload.id });
    },
    clearGroupsState: () => {
      return [];
    },
    defaultGroupsState: () => {
      return initialLocalState;
    },
    initGroupsState: (state, action: PayloadAction<IGroup[]>) => {
      return (state = action.payload);
    },
    addGroup: (state, action: PayloadAction<IGroup["id"]>) => {
      state.push({ name: "new group", id: action.payload });
    },
    removeGroup: (state, action: PayloadAction<IGroup["id"]>) => {
      state.map((i, index) => {
        if (i.id === action.payload) {
          state.splice(index, 1);
        }
      });
    },
    changeGroupName: (
      state,
      action: PayloadAction<{
        groupId: IGroup["id"];
        inputValue: IGroup["name"];
      }>
    ) => {
      state.forEach((i) => {
        if (i.id === action.payload.groupId) {
          i.name = action.payload.inputValue;
        }
      });
    },
    swapGroups: (
      state,
      action: PayloadAction<{
        overGroupId: IGroup["id"];
        activeGroupId: IGroup["id"];
      }>
    ) => {
      const ibItem = state.find((i) => i.id === action.payload.overGroupId);
      const iaItem = state.find((i) => i.id === action.payload.activeGroupId);

      const newState = state.map((i) => {
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
