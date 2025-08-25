import { useAppSelector } from "@/app/hooks"
import { selectLocalTimer } from "./slice"
import { formatTime } from "@/helpers.ts/formatTime"

export default function LocalTimer() {
  const localTimer: number = useAppSelector(selectLocalTimer)

  return <>{formatTime(localTimer / 1000)}</>
}
