import { useEffect } from "react"
import { tick } from "@/features/timer/slice"
import { useAppDispatch } from "@/app/hooks"

export function useTicker(intervalMs: number = 1000) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(tick())
    }, intervalMs)
    return () => clearInterval(intervalId)
  }, [])
}
