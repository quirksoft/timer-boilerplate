import { createSlice, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"
import { Timer, TimersState } from "./types"
import { fetchTimers, createTimer } from "./thunks"

export const name = "timersList"

const initialState: TimersState = {
  map: {},
  fetchTimers: {
    status: "idle",
    error: null,
  },
  resetTimer: {
    status: "idle",
    error: null,
  },
  isInitialLoading: true,
}

export const timers = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTimers.pending, state => {
      state.fetchTimers.status = "pending"
    })
    builder.addCase(fetchTimers.fulfilled, (state, action) => {
      state.fetchTimers.status = "succeeded"
      state.isInitialLoading = false
      state.map = action.payload.reduce(
        (acc, { id, start, elapsed, receivedAt }) => {
          acc[id] = { start, elapsed, receivedAt }
          return acc
        },
        {} as Record<string, Timer>,
      )
    })
    builder.addCase(fetchTimers.rejected, (state, action) => {
      state.fetchTimers.status = "failed"
      state.fetchTimers.error = action.error.message ?? "Unknown Error"
    })
    builder.addCase(createTimer.pending, (state, action) => {
      if (action.meta.arg.source === name) {
        state.resetTimer.status = "pending"
      }
    })
    builder.addCase(createTimer.fulfilled, (state, action) => {
      const { id, elapsed, start, receivedAt } = action.payload
      if (action.meta.arg.source === name) {
        state.resetTimer.status = "succeeded"
      }
      state.map[id] = { elapsed, start, receivedAt }
    })
    builder.addCase(createTimer.rejected, (state, action: any) => {
      if (action.meta.arg.source === name) {
        state.resetTimer.status = "failed"
        state.resetTimer.error = action.error.message ?? "Unknown Error"
      }
    })
  },
})

export const {} = timers.actions

export default timers.reducer

const selectTimerMap = (state: RootState) => state.timers.map
export const selectAllTimers = createSelector(
  selectTimerMap,
  (map: Record<string, Timer>) => Object.entries(map),
)
export const selectTimersStatus = (state: RootState) =>
  state.timers.fetchTimers.status
export const selectTimersError = (state: RootState) =>
  state.timers.fetchTimers.error
export const selectIsInitialLoading = (state: RootState) =>
  state.timers.isInitialLoading
