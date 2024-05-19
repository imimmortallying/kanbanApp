import { RootState } from "app/ReduxStore/store";
import { createSelector } from "reselect";

export const selectGroups = createSelector(
  (state: RootState) => state,
  (state) => state.groups
);

export const selectGroupsIds = createSelector(selectGroups, (groupsIds) =>
  groupsIds.map(group => group.id)
);
