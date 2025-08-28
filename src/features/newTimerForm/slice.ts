import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"
import { FormState } from "@/features/newTimerForm/types"
import { createTimer } from "@/features/timersList/thunks"

export const name = "form"

const initialState: FormState = {
  status: "idle",
  error: null,
}

export const form = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTimer.pending, (state, action) => {
      if (action.meta.arg.source === name) {
        state.status = "pending"
      }
    })
    builder.addCase(createTimer.fulfilled, (state, action) => {
      if (action.meta.arg.source === name) {
        state.status = "succeeded"
      }
    })
    builder.addCase(createTimer.rejected, (state, action: any) => {
      if (action.meta.arg.source === name) {
        state.status = "failed"
        state.error = action.payload ?? "Unknown Error"
      }
    })
  },
})

export const {} = form.actions

export default form.reducer

export const selectFormStatus = (state: RootState) => state.form.status
export const selectFormError = (state: RootState) => state.form.error
