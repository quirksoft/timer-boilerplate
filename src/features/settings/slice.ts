import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/app/store"

export const settings = createSlice({
  name: "tabsView",
  initialState: {
    tabsView: true,
    theme: "light",
    preserveLocalTimer: false,
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
