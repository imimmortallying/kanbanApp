import { configureStore } from "@reduxjs/toolkit";
import visibilityFilter from "features/filterReducer/visibilityFilterSlice";
import findingString from "features/findReducer/findSlice";
import todos from "features/todosReducer/todosSlice";
import groups from "features/groupsReducer/groupsSlice";
import login from "features/AuthByUsername/model/slice/loginSlice";
import registration from "features/AuthByUsername/model/slice/RegisterSlice";
import user from "entities/User/model/slice/userSlice";



export const store =  configureStore({
    reducer: {
        todos: todos,
        visibilityFilter: visibilityFilter,
        findingString: findingString,
        groups: groups,
        login:login, //  - то, что я отправляю на сервер?
        user:user,
        registration: registration
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

