import { useAppSelector } from "@/app/hooks"
import { selectLocalTimer } from "./slice"
import { Timer } from "@/features/timers/types"

function formatElapsed(seconds: number) {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export default function ServerTimer({ elapsed, receivedAt }: Timer) {
  useAppSelector(selectLocalTimer)
  const now = Date.now() / 1000

  return <>{formatElapsed(elapsed + (now - receivedAt))}</>
}
