import { useEffect } from "react"
import { useAppDispatch } from "@/app/hooks"
import { startTimer, saveLocalTimerToStorage } from "@/features/timer/slice"

export function useTimer(frequencyMs: number) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(startTimer(frequencyMs))

    return () => {
      dispatch(saveLocalTimerToStorage())
    }
  }, [])
}
