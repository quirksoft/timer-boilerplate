import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"
import { SettingState } from "./types"
import type { AppTheme } from "@/app/types"
import { THEME } from "@/app/constants"

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const tabsViewParam = urlParams.get("tabsView")
const tabsView = !(tabsViewParam === "false")
const localTimer: string | null = localStorage.getItem("localTimer")

const initialState: SettingState = {
  tabsView,
  theme: THEME.light,
  preserveLocalTimer: !!localTimer,
}

export const settings = createSlice({
  name: "tabsView",
  initialState,
  reducers: {
    toggleTabs: state => {
      state.tabsView = !state.tabsView
    },
    setTheme: (state, action: PayloadAction<AppTheme>) => {
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
