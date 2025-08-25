import { Middleware } from "@reduxjs/toolkit"
import { toggleTabs } from "@/features/settings/slice"

export const tabsViewMiddleware: Middleware = store => next => action => {
  const result = next(action)

  if (toggleTabs.match(action)) {
    const state = store.getState()
    const view = state.settings.tabsView

    const searchParams = new URLSearchParams(window.location.search)
    searchParams.set("tabsView", view)
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`
    window.history.replaceState({}, "", newUrl)
  }

  return result
}
