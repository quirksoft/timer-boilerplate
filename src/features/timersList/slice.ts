import { createSlice, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"
import { Timer, TimersState } from "./types"
import { fetchTimers, createTimer } from "./thunks"
import { STATUS } from "@/app/constants"

export const name = "timersList"

const initialState: TimersState = {
  map: {},
  fetchTimers: {
    status: STATUS.idle,
    error: null,
  },
  resetTimer: {
    id: "",
    status: STATUS.idle,
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
      state.fetchTimers.status = STATUS.pending
      state.fetchTimers.error = null
    })
    builder.addCase(fetchTimers.fulfilled, (state, action) => {
      state.fetchTimers.status = STATUS.succeeded
      state.fetchTimers.error = null
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
      state.fetchTimers.status = STATUS.failed
      state.fetchTimers.error = action.payload ?? "Unknown Error"
    })
    builder.addCase(createTimer.pending, (state, action) => {
      const { source, id } = action.meta.arg

      if (source === name) {
        state.resetTimer.status = STATUS.pending
        state.resetTimer.error = null
        state.resetTimer.id = id
      }
    })
    builder.addCase(createTimer.fulfilled, (state, action) => {
      const { id, elapsed, start, receivedAt } = action.payload
      if (action.meta.arg.source === name) {
        state.resetTimer.status = STATUS.succeeded
        state.resetTimer.error = null
      }
      state.map[id] = { elapsed, start, receivedAt }
    })
    builder.addCase(createTimer.rejected, (state, action: any) => {
      if (action.meta.arg.source === name) {
        state.resetTimer.status = STATUS.failed
        state.resetTimer.error = action.payload ?? "Unknown Error"
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

export const selectResetError = (state: RootState) =>
  state.timers.resetTimer.error
export const selectResetStatus = (state: RootState) =>
  state.timers.resetTimer.status
export const selectResetId = (state: RootState) => state.timers.resetTimer.id
