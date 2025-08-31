import { Middleware } from "@reduxjs/toolkit"
import { toggleTabs, togglePreserveLocalTimer } from "@/features/settings/slice"
import { saveLocalTimerToStorage } from "../timer/slice"

export const settingsMiddleware: Middleware = store => next => action => {
  const result = next(action)
  const state = store.getState()

  if (toggleTabs.match(action)) {
    const { tabsView } = state.settings

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("tabsView", tabsView)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.replaceState({}, "", newUrl)
  }

  if (togglePreserveLocalTimer.match(action)) {
    const { preserveLocalTimer } = state.settings

    if (preserveLocalTimer) {
      store.dispatch(saveLocalTimerToStorage())
    } else {
      localStorage.removeItem("localTimer")
    }
  }

  return result
}
