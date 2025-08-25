import { useAppSelector } from "@/app/hooks"
import { selectLocalTimer } from "./slice"
import { Timer } from "@/features/timers/types"
import { formatTime } from "@/helpers.ts/formatTime"

export default function ServerTimer({ elapsed, receivedAt }: Timer) {
  useAppSelector(selectLocalTimer)
  const now = Date.now() / 1000

  return <>{formatTime(elapsed + (now - receivedAt))}</>
}
