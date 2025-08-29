import { createAppAsyncThunk } from "@/app/withTypes"
import { SliceNames, TimerResponse, TimerWithId } from "./types"
import { getTimer, getListOfTimers, postTimer } from "./api"

export const fetchTimerById = createAppAsyncThunk(
  "timer/fetchTimerById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response: TimerResponse = await getTimer(id)

      return response
    } catch (err: unknown) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue("Unknown error")
    }
  },
)

export const fetchTimers = createAppAsyncThunk<
  TimerWithId[],
  void,
  { rejectValue: string }
>("timer/fetchTimers", async (_, { rejectWithValue }) => {
  try {
    const ids: string[] = await getListOfTimers()

    return Promise.all(
      ids.map(async id => {
        const response: TimerResponse = await getTimer(id)
        const receivedAt = Date.now() / 1000

        return { id, ...response, receivedAt }
      }),
    )
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    }
    return rejectWithValue("Unknown error")
  }
})

export const createTimer = createAppAsyncThunk<
  TimerWithId,
  { id: string; source: SliceNames },
  { rejectValue: string }
>("timer/createTimer", async ({ id }, { rejectWithValue }) => {
  try {
    const response: TimerResponse = await postTimer(id)
    const receivedAt = Date.now() / 1000

    return { id, ...response, receivedAt }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return rejectWithValue(err.message)
    }
    return rejectWithValue("Unknown error")
  }
})
