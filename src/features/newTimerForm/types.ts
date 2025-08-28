export interface FormState {
  status: "idle" | "pending" | "succeeded" | "failed"
  error: string | null
}
