import { Middleware } from "@reduxjs/toolkit"
import {
  startTimer,
  restoreTimer,
  saveLocalTimerToStorage,
  stopTimer,
  resetTimer,
  tick,
} from "@/features/timer/slice"
import { FREQUENCY_MS } from "@/app/constants"

export const timerMiddelware: Middleware = store => {
  let intervalId: ReturnType<typeof setTimeout> | null = null

  return next => action => {
    const result = next(action)
    const state = store.getState()
    const { preserveLocalTimer } = state.settings

    if (startTimer.match(action)) {
      if (preserveLocalTimer) {
        const localTimer: string | null = localStorage.getItem("localTimer")

        localTimer !== null && store.dispatch(restoreTimer(+localTimer))
      }

      const frequencyMs = action.payload

      if (intervalId === null) {
        intervalId = setInterval(() => {
          store.dispatch(tick(frequencyMs || FREQUENCY_MS))
        }, frequencyMs)
      }
    }

    if (saveLocalTimerToStorage.match(action) || resetTimer.match(action)) {
      const { start } = state.timer

      if (preserveLocalTimer) {
        localStorage.setItem("localTimer", start)
      }
    }

    if (stopTimer.match(action)) {
      intervalId !== null && clearInterval(intervalId)
      intervalId = null

      store.dispatch(saveLocalTimerToStorage())
    }

    return result
  }
}
