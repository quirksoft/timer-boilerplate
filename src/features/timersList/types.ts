type WithId<T> = T & { id: string }

export interface TimerResponse {
  start: number
  elapsed: number
}

export interface Timer extends TimerResponse {
  receivedAt: number
}

export type TimerWithId = WithId<Timer>

interface FetchStatus {
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}

export interface TimersState {
  map: Record<string, Timer>
  fetchTimers: FetchStatus
  resetTimer: FetchStatus
  isInitialLoading: boolean
}

export type SliceNames = "form" | "timersList"
