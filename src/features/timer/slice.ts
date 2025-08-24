import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"

export const timer = createSlice({
  name: "timer",
  initialState: { localTimer: 0 },
  reducers: {
    tick: (state, action: PayloadAction<number>) => {
      state.localTimer += action.payload
    },
  },
})

export const { tick } = timer.actions

export default timer.reducer

export const selectLocalTimer = (state: RootState) => state.timer.localTimer
