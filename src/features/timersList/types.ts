import type { FetchStatus } from "@/app/types"

type WithId<T> = T & { id: string }

export interface TimerResponse {
  start: number
  elapsed: number
}

export interface Timer extends TimerResponse {
  receivedAt: number
}

export type TimerWithId = WithId<Timer>

export interface TimersState {
  map: Record<string, Timer>
  fetchTimers: FetchStatus
  resetTimer: WithId<FetchStatus>
  isInitialLoading: boolean
}

export type SliceNames = "form" | "timersList"
