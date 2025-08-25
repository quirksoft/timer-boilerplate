export function formatTime(totalSeconds: number): string {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  )
  const seconds = String(Math.trunc(totalSeconds % 60)).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}
