import { createSlice } from '@reduxjs/toolkit'

export const findingStringSlice = createSlice({
    name: 'findingString',
    initialState: '',
    reducers: {
        updateFindingString:  (state, action) => state = action.payload
    }
})

export default findingStringSlice.reducer
export const { updateFindingString } = findingStringSlice.actions