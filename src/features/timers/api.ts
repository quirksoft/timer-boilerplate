import { Timer, TimerResponse } from "./types"

export async function getTimer(id: string): Promise<TimerResponse> {
  const response = await fetch(`http://localhost:8080/${id}`)
  const data: Timer = await response.json()

  return data
}

export async function getListOfTimers(): Promise<string[]> {
  const response = await fetch("http://localhost:8080/list")
  const data: string[] = await response.json()

  return data
}

export async function postTimer(id: string): Promise<TimerResponse> {
  const response = await fetch(`http://localhost:8080/reset/${id}`, {
    method: "POST",
  })
  const data: Timer = await response.json()

  return data
}
