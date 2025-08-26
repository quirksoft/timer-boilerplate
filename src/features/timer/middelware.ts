import { Middleware } from "@reduxjs/toolkit"
import {
  startTimer,
  restoreTimer,
  saveLocalTimerToStorage,
} from "@/features/timer/slice"
import { tick } from "@/features/timer/slice"

export const timerMiddelware: Middleware = store => {
  let intervalId: ReturnType<typeof setTimeout> | null = null

  return next => action => {
    const result = next(action)
    const state = store.getState()
    const { preserveLocalTimer } = state.settings

    if (startTimer.match(action) && intervalId === null) {
      if (preserveLocalTimer) {
        const localTimer: string | null = localStorage.getItem("localTimer")

        localTimer !== null && store.dispatch(restoreTimer(+localTimer))
      }

      const frequencyMs = action.payload

      intervalId = setInterval(() => {
        store.dispatch(tick(frequencyMs))
      }, frequencyMs)
    }

    if (saveLocalTimerToStorage.match(action)) {
      const { start } = state.timer

      if (preserveLocalTimer) {
        localStorage.setItem("localTimer", start)
      }

      intervalId !== null && clearInterval(intervalId)
      intervalId = null
    }

    return result
  }
}
