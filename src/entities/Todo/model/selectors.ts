import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "app/ReduxStore/store";

export const selectTodos = (state:RootState) => state.todos;

export const selectTodoById = (state:RootState, todoId:any) => {
  return state.todos.find((todo:any) => todo.id === todoId)
}

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

export const selectFindedAndFilteredTodoIds = createSelector(
    selectFindedTodos,
    filteredTodos => filteredTodos.map((todo:any) => todo.id)
  )

export const selectGroupedAndFiltredTodos = createSelector(
  (state: RootState) => state,
  selectFindedTodos,
  (state, selectFindedTodos) => {

    let groupedTodos: { [key: string]: any } = {};
    for (let group of state.groups) {
      if (groupedTodos[group.id] === undefined)
        groupedTodos[group.id] = { groupId: group.id, groupName: group.name, todos: [] };
    }

    for (let todo of selectFindedTodos) {
        groupedTodos[todo.group]?.todos.push(todo.id);
    }
    //объект в массив
    return Object.values(groupedTodos)

  }
);
