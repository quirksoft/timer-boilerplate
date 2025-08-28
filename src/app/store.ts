import { configureStore } from "@reduxjs/toolkit"
import settingsReducer from "@/features/settings/slice"
import timersReducer from "@/features/timersList/slice"
import timerReducer from "@/features/timer/slice"
import newTimerFormReducer from "@/features/newTimerForm/slice"
import { tabsViewMiddleware } from "@/features/settings/middleware"
import { timerMiddelware } from "@/features/timer/middelware"

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    timers: timersReducer,
    timer: timerReducer,
    form: newTimerFormReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tabsViewMiddleware, timerMiddelware),
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"]
