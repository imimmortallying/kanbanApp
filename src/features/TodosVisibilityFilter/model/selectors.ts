import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/ReduxStore/store'

export const selectAcomplishment = createSelector(
    (state: RootState) => state,
    (state) => state.visibilityFilter.acomplishment
)