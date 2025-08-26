import { useAppSelector } from "@/app/hooks"
import { selectLocalTimer, selectStart } from "./slice"
import { formatTime } from "@/helpers.ts/formatTime"

export default function LocalTimer() {
  useAppSelector(selectLocalTimer)
  const start = useAppSelector(selectStart)
  const now = Date.now() / 1000

  return <>{formatTime(now - start)}</>
}
