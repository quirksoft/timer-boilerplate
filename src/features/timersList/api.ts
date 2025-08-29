import { Timer, TimerResponse } from "./types"
const URL = import.meta.env.VITE_API_URL

export async function getTimer(id: string): Promise<TimerResponse> {
  const response = await fetch(`${URL}/${id}`)

  if (!response.ok) {
    let message = `Server returned ${response.status}`

    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {}

    throw new Error(message)
  }

  const data: Timer = await response.json()

  return data
}

export async function getListOfTimers(): Promise<string[]> {
  const response = await fetch(`${URL}/list`)

  if (!response.ok) {
    let message = `Server returned ${response.status}`

    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {}

    throw new Error(message)
  }

  const data: string[] = await response.json()

  return data
}

export async function postTimer(id: string): Promise<TimerResponse> {
  const response = await fetch(`${URL}/reset/${id}`, {
    method: "POST",
  })

  if (!response.ok) {
    let message = `Server returned ${response.status}`

    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {}

    throw new Error(message)
  }

  const data: Timer = await response.json()

  return data
}
