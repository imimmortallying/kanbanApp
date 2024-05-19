import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/ReduxStore/store'

export const selectaccomplishment = createSelector(
    (state: RootState) => state,
    (state) => state.visibilityFilter.accomplishment
)