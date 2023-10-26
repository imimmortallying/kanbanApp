
import { createSlice } from "@reduxjs/toolkit";

 export const visibilityFilterSlice = createSlice({
    name: 'visibilityFilter',
    initialState: {
        acomplishment: 'all',
        importance: []
    },
    reducers: {
        showAll: (state) => {
            state.acomplishment = 'all'
        },
        showClosed: (state) => {
            state.acomplishment = 'closed'
        },
        showOpened: (state) => {
            state.acomplishment = 'opened'
        },
        toggleFilter: (state, action)=>{
            if (state.importance.includes(action.payload)){
                state.importance.forEach((i, index)=>{
                    if (i === action.payload) {
                        state.importance.splice(index, 1)
                    }
                })
            } else state.importance.push(action.payload)
        }
    }
 })

export const { showAll, showClosed, showOpened, toggleFilter } = visibilityFilterSlice.actions
export default visibilityFilterSlice.reducer




