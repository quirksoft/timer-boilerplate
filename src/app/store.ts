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

export type AppStore = typeof store
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
