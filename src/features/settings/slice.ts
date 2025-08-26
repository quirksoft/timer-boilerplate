import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const tabsViewParam = urlParams.get("tabsView")
const tabsView = !(tabsViewParam === "false")

export const settings = createSlice({
  name: "tabsView",
  initialState: {
    tabsView,
    theme: "light",
    preserveLocalTimer: true,
  },
  reducers: {
    toggleTabs: state => {
      state.tabsView = !state.tabsView
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.theme = action.payload
    },
    togglePreserveLocalTimer: state => {
      state.preserveLocalTimer = !state.preserveLocalTimer
    },
  },
})

export const { toggleTabs, setTheme, togglePreserveLocalTimer } =
  settings.actions

export const selectTabsView = (state: RootState) => state.settings.tabsView
export const selectTheme = (state: RootState) => state.settings.theme
export const selectPreserveLocalTimer = (state: RootState) =>
  state.settings.preserveLocalTimer

export default settings.reducer
