
import { createSlice } from '@reduxjs/toolkit'

interface Todo {
    id: string,
    text: string,
    completed: boolean
}

interface Action {
    type?: string,
    id?: string,
    text?: string
    filter?: string,
}

const initialState = [
    { group: 'group1', text: 'Существуют две основные трактовки понятия «текст»: имманентная (расширенная, философски нагруженная) и репрезентативная (более частная). Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры.', id: '1', completed: true, importance: 'not chosen'},
    { group: 'group1', text: 'Сходить на рынок', id: '2', completed: true, importance: 'not chosen'},
    { group: 'group2', text: 'Убраться на столе', id: '3', completed: true, importance: 'not chosen'},
    { group: 'group2', text: 'Позвонить брату', id: '4', completed: true, importance: 'not chosen'},
    { group: 'group3', text: 'Убраться в комнате', id: '5', completed: true, importance: 'not chosen'},
    { group: 'group3', text: 'Поставить чайник', id: '6', completed: true, importance: 'not chosen'},
]

export const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        //! багулина: при перемещении туду отправляется экшен перетаскивания группы. TodoGroups
        updateTodoResponse: (state, action) => {
           return state.map((i) => {
                if (i.id === action.payload.todoId) {
                    console.log(action.payload.newTodo)
                    i = action.payload.newTodo
                }
                return i
            })
        },
        deleteTodoResponse: (state, action) => {
            state.forEach((i, index) => {
                if (i.id === action.payload) {
                    state.splice(index, 1)
                }
            })
        },
        addTodoResponse: (state, action) => {
            
            state.push(action.payload)

        },
        clearTodosState: (state) => {
            return state = [];
        },
        defaultTodosState: (state) => {
            return state = initialState;
        },
        initTodosState: (state, action) => {
            return state = action.payload;
        },
        // выше - работа с сервером
        add: (state, action) => {
            
            state.push({ group: action.payload.group, id: action.payload.id, text: '', completed: false, importance: 'not chosen', description: '' })

        },
        toggle: (state, action) => {
            state.forEach((i) => {
                if (i.id === action.payload) {
                    i.completed = !i.completed
                }
            })
        },
        remove: (state, action) => {
            state.forEach((i, index) => {
                if (i.id === action.payload) {
                    state.splice(index, 1)
                }
            })
        },
        changeImportance: (state, action) => {
            state.forEach((i) => {
                if (i.id === action.payload.id) {
                    i.importance = action.payload.value
                }
            })
        },
        changeTodoText: (state, action) => {
            state.forEach((i) => {
                if (i.id === action.payload.id){
                    i.text = action.payload.textareaValue
                }
            })
        },
        removeTodoGroup: (state, action) => {
            return state.filter((i) => {
                return i.group !== action.payload
            })
        },
        swapTodos: (state, action) => {
            const ibItem = state.find(i => i.id === action.payload.ib);
            const iaItem = state.find(i => i.id === action.payload.ia);

            let newState = state.map(i => {
                if(i.id === action.payload.ia) {
                    return ibItem;
                }
                if(i.id === action.payload.ib) {
                    return iaItem;
                }
                return i;
            });
           return newState
        },
        changeDraggingTodoGroup(state, action){
            state.forEach((i) => {
                if (i.id === action.payload.activeId) {
                    i.group = action.payload.newGroup
                }
            })
        }
        
    }
})


export default todosSlice.reducer
export const { clearTodosState, add, toggle, remove, changeImportance,
     removeTodoGroup, changeTodoText, swapTodos, changeDraggingTodoGroup, initTodosState, addTodoResponse, deleteTodoResponse,
     updateTodoResponse, defaultTodosState
    } = todosSlice.actions

export const selectTodoById = (state:any, todoId:any) => { // используется для отрисовки туду, исходя из полученного id. Todo.tsx
    return state.todos.find((todo:any) => todo.id === todoId)
}

export const selectTodos = (state:any) => state.todos;
//! ниже идет мемоизация при помощи reselect библиотеки
// способ работы со стейтом вместо const todoIds = useSelector(selectTodoIds, shallowEqual) который позволяет:
// 1) заменить shallowEqual, чтобы не вызывать ре-рендеринг всего списка задач, связанного с тем, что .map возвращает новую ссылку
// 2) сейчас я совмещаю 2 части стейта - фильтры и тудус - внутри Todo.tsx. CreateSelector же принимает несколько частей стейта, 
// получает измененное знаечние на их основе, и затем эту ф-ю селектор можно передать для рендеринга в TodoList.tsx. 
// при этом логика по фильтрации выносится из Todo компонента и становится проще. 
// таким образом, я получаю отфильтрованные задачи, нахожу Id эти задач и лишь их отрисовываю, не изменяя стейт - получается своеобразный middleware

// 
import { createSelector } from 'reselect'
export const selectFilteredTodos = createSelector(
    state => state.todos,
    state => state.visibilityFilter.acomplishment,
    state => state.visibilityFilter.importance,

    (todos:[], acomplishment, importance:[]) => {
        if (acomplishment === 'all' && importance.length === 0) {
            return todos
        }
        
        const completedStatus = acomplishment === 'closed' // вернет тру или фолс, т.е отфильтрует и оставит только туду с тру или с фолс
        // @ts-ignore
        // return todos.filter(todo => todo.completed === completedStatus) // это проверка совпадения состояния todo и сост. фильтра
        return todos.filter(todo => {
            // @ts-ignore
            
            const statusMatches = acomplishment === 'all' || todo.completed === completedStatus
            // @ts-ignore

            const importanceMatches = importance.length === 0 || importance.includes(todo.importance)
            console.log(statusMatches && importanceMatches)
            return statusMatches && importanceMatches
          })
    }
   
)

export const selectFindedTodos = createSelector(
    state => state.findingString,
    selectFilteredTodos,
    // @ts-ignore
    (findingString, selectFilteredTodos) => selectFilteredTodos.filter((item:any) => {
        // return item.text.split(' ').find((str:any)=>str.includes('')) // нужно также предусммотреть не только совпадение в 1 слове, но и совпадение со всей цельной строкой
        return item.text.includes(findingString)
    })
)



export const selectFilteredTodoIds = createSelector(
    // Pass our other memoized selector as an input
    selectFindedTodos,
    // And derive data in the output selector
    // @ts-ignore
    filteredTodos => filteredTodos.map(todo => todo.id)
  )
