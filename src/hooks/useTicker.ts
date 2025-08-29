import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { startTimer, stopTimer } from "@/features/timer/slice"

export function useTimer(frequencyMs: number) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startTimer(frequencyMs))

    return () => {
      dispatch(stopTimer())
    }
  }, [])
}
