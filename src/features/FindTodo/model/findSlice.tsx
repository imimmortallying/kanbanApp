import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFindingString } from "./types";

const initialState: IFindingString = "";

export const findingStringSlice = createSlice({
  name: "findingString",
  initialState: initialState,
  reducers: {
    updateFindingString: (state, action: PayloadAction<IFindingString>) =>
      (state = action.payload),
  },
});

export default findingStringSlice.reducer;
export const { updateFindingString } = findingStringSlice.actions;
