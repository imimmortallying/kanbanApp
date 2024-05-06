import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "app/ReduxStore/store"

export const selectUserAuthData = createSelector(
    (state: RootState) => state,
    (state) => state.user.authData
)