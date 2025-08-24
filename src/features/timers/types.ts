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
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}
