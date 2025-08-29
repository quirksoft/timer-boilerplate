import { createSlice } from "@reduxjs/toolkit"
import type { RootState } from "@/app/store"
import { createTimer } from "@/features/timersList/thunks"
import { STATUS } from "@/app/constants"
import type { FetchStatus } from "@/app/types"

export const name = "form"

const initialState: FetchStatus = {
  status: STATUS.idle,
  error: null,
}

export const form = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createTimer.pending, (state, action) => {
      if (action.meta.arg.source === name) {
        state.status = STATUS.pending
        state.error = null
      }
    })
    builder.addCase(createTimer.fulfilled, (state, action) => {
      if (action.meta.arg.source === name) {
        state.status = STATUS.succeeded
        state.error = null
      }
    })
    builder.addCase(createTimer.rejected, (state, action: any) => {
      if (action.meta.arg.source === name) {
        state.status = STATUS.failed
        state.error = action.payload ?? "Unknown Error"
      }
    })
  },
})

export const {} = form.actions

export default form.reducer

export const selectFormStatus = (state: RootState) => state.form.status
export const selectFormError = (state: RootState) => state.form.error
