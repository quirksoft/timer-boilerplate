import { STATUS, THEME } from "./constants"

export type AppTheme = THEME.dark | THEME.light
export type Status =
  | STATUS.idle
  | STATUS.pending
  | STATUS.succeeded
  | STATUS.failed

export interface FetchStatus {
  status: Status
  error: string | null
}
