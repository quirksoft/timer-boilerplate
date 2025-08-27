import { createSlice, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"
import { Timer, TimersState } from "./types"
import { fetchTimers, createTimer } from "./thunks"

const initialState: TimersState = {
  map: {},
  status: "idle",
  error: null,
}

export const timers = createSlice({
  name: "timers",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTimers.pending, state => {
      state.status = "pending"
    })
    builder.addCase(fetchTimers.fulfilled, (state, action) => {
      state.status = "succeeded"
      state.map = action.payload.reduce(
        (acc, { id, start, elapsed, receivedAt }) => {
          acc[id] = { start, elapsed, receivedAt }
          return acc
        },
        {} as Record<string, Timer>,
      )
    })
    builder.addCase(fetchTimers.rejected, (state, action) => {
      state.status = "failed"
      state.error = action.error.message ?? "Unknown Error"
    })
    builder.addCase(createTimer.pending, state => {
      state.status = "pending"
    })
    builder.addCase(createTimer.fulfilled, (state, action) => {
      const { id, elapsed, start, receivedAt } = action.payload

      state.status = "succeeded"
      state.map[id] = { elapsed, start, receivedAt }
    })
    builder.addCase(createTimer.rejected, (state, action: any) => {
      state.status = "failed"
      state.error = action.error.message ?? "Unknown Error"
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
export const selectTimersStatus = (state: RootState) => state.timers.status
export const selectTimersError = (state: RootState) => state.timers.error
