import { Timer, TimerResponse } from "./types"
const URL = import.meta.env.VITE_API_URL

export async function getTimer(id: string): Promise<TimerResponse> {
  const response = await fetch(`${URL}/${id}`)
  const data: Timer = await response.json()

  return data
}

export async function getListOfTimers(): Promise<string[]> {
  const response = await fetch(`${URL}/list`)
  const data: string[] = await response.json()

  return data
}

export async function postTimer(id: string): Promise<TimerResponse> {
  const response = await fetch(`${URL}/reset/${id}`, {
    method: "POST",
  })
  const data: Timer = await response.json()

  return data
}
