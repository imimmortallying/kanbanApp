
import { createSelector, createSlice } from '@reduxjs/toolkit'
import { selectFilteredTodoIds, selectFilteredTodos } from 'features/todosReducer/todosSlice' // чтобы получить селектор id внутри группы
import { useSelector } from 'react-redux'

const initialState = [
    { id: 'group1', name: 'group1' },
    { id: 'group2', name: 'group2' },
    { id: 'group3', name: 'group3' },
]

export const groupsSlice = createSlice({
    name: 'groups',
    initialState: [],
    reducers: {
        changeGroupNameResponse: (state, action) => {
            state.forEach((i)=>{
                if (i.id === action.payload.groupId) {
                    i.name = action.payload.currentGroupName
                }
            })
        },
        swapGroupsResponse: (state, action) => { 
            if (state != action.payload) {
                // console.log('payload', action.payload)
                return state = action.payload
            }
            return
        },
        removeGroupResponse: (state, action) => { 
            state.map((i, index) => {
                if (i.id === action.payload) {
                    state.splice(index, 1)
                }
            })
        },
        addGroupResponse: (state, action) => {
            state.push({ name: action.payload.name, id: action.payload.id })
        },
        clearGroupsState: (state) => {
            return state = [];
        },
        defaultGroupsState: (state) => {
            return state = initialState;
        },
        initGroupsState: (state, action) => {
            return state = action.payload;
        },
        // выше - работа с сервером
        addGroup: (state, action) => {
            state.push({ name: 'new group', id: action.payload })
        },
        removeGroup: (state, action) => { 
            state.map((i, index) => {
                if (i.id === action.payload) {
                    state.splice(index, 1)
                }
            })
        },
        changeGroupName: (state, action) => {
            state.forEach((i)=>{
                if (i.id === action.payload.groupId) {
                    i.name = action.payload.inputText
                }
            })
        }, 
        swapGroups: (state, action) => {
            const ibItem = state.find(i => i.id === action.payload.overGroupId);
            const iaItem = state.find(i => i.id === action.payload.activeGroupId);

            let newState = state.map(i => {
                if(i.id === action.payload.activeGroupId) {
                    return ibItem;
                }
                if(i.id === action.payload.overGroupId) {
                    return iaItem;
                }
                return i;
            });
           return newState
        }
    }
})


export default groupsSlice.reducer
export const { addGroup, removeGroup, changeGroupName, swapGroups, initGroupsState,
     clearGroupsState, addGroupResponse, removeGroupResponse, swapGroupsResponse, changeGroupNameResponse, defaultGroupsState } = groupsSlice.actions

export const selectGroupById = ((state: any) => state.groups)
export const todos = ((state: any) => state.todos)

//! Получаю selector group:[id]

// получилось получить селектор вида [name: group1, todos:[todoId, подходящие данному group]]
// но чего я добился? 


//при этом, даже если не рисовать компоненты, опираясь на этот селектор, само наличие этого объекта
// и вывод его в консоль вызывает полный перерендеринг

// какие еще варианты есть, чтобы, например, добавить новую туду, но не вызвать перерендеринг всего приложения? shalowEqual, что еще?

// export const groupeTodoIds = createSelector(
//     selectGroupById,
//     selectFilteredTodoIds,
//     todos,

//     (selectGroupById, todoIds, todos) => {
//         return selectGroupById.map((i:any)=>{
//             //@ts-ignore
//             return {name: i.name, id: i.id, todos: todoIds.filter(todoId => {
//                 return todos.find((todo:any) => todo.id === todoId).group === i.id
//             })}
//         })
//     }
    
// )
