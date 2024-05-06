import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/ReduxStore/store'

// import { ICartItem } from './types'

export const selectAcomplishment = createSelector(
    (state: RootState) => state,
    (state) => state.visibilityFilter.acomplishment
)