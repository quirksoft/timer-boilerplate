import { useEffect, useState } from "react"
import { useAppSelector } from "@/app/hooks"
import { selectLocalTimer } from "./slice"

function formatTime(totalSeconds: number): string {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0")
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0",
  )
  const seconds = String(totalSeconds % 60).padStart(2, "0")
  return `${hours}:${minutes}:${seconds}`
}

export default function Timer({ inputSeconds }: { inputSeconds?: number }) {
  const localTimer: number = useAppSelector(selectLocalTimer)
  const [seconds, setSeconds] = useState<number>(inputSeconds || 0)

  useEffect(() => {
    setSeconds(prev => prev + 1)
  }, [localTimer])

  return <>{formatTime(seconds)}</>
}
