import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"

interface LocalTimerState {
  start: number
  localTimer: number
}

const initialState: LocalTimerState = {
  start: 0,
  localTimer: 0,
}

export const timer = createSlice({
  name: "timer",
  initialState: initialState,
  reducers: {
    tick: (state, action: PayloadAction<number>) => {
      state.localTimer += action.payload
    },
    startTimer: (state, _action: PayloadAction<number>) => {
      state.start = Date.now() / 1000
    },
    restoreTimer: (state, action: { payload: number }) => {
      state.start = action.payload
    },
  },
})

export const { tick, startTimer, restoreTimer } = timer.actions
export const saveLocalTimerToStorage = createAction("timer/saveLocalToStorage")

export default timer.reducer

export const selectLocalTimer = (state: RootState) => state.timer.localTimer
export const selectStart = (state: RootState) => state.timer.start
