import * as React from "react"
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  Tab,
  TabList,
  makeStaticStyles,
} from "@fluentui/react-components"
import {
  WrenchSettingsFilled,
  WrenchSettingsRegular,
  TimerFilled,
  TimerRegular,
  bundleIcon,
} from "@fluentui/react-icons"
import type {
  SelectTabData,
  SelectTabEvent,
  TabValue,
  Theme,
} from "@fluentui/react-components"
import { Timers } from "./Timers"
import { Settings } from "./Settings"

const TimerIcon = bundleIcon(TimerFilled, TimerRegular)
const SettingsIcon = bundleIcon(WrenchSettingsFilled, WrenchSettingsRegular)

const useGlobalStyles = makeStaticStyles([
  "html, body, #root, .App { margin: 0; padding: 0; height: 100vh; }",
])

const THEMES: { [key: string]: Theme } = {
  dark: webDarkTheme,
  light: webLightTheme,
}

export const App = () => {
  useGlobalStyles()

  const [theme, setTheme] = React.useState<string>("light")

  const [selectedValue, setSelectedValue] = React.useState<TabValue>("timers")

  const [tabsView, setTabsView] = React.useState<boolean>(true)

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedValue(data.value)
  }

  return (
    <FluentProvider theme={THEMES[theme]}>
      <div className="App ms-Grid">
        {tabsView ? (
          <>
            <TabList selectedValue={selectedValue} onTabSelect={onTabSelect}>
              <Tab id="Timers" icon={<TimerIcon />} value="timers">
                Timers
              </Tab>
              <Tab id="Settings" icon={<SettingsIcon />} value="settings">
                Settings
              </Tab>
            </TabList>
            <div>
              {selectedValue === "timers" && <Timers />}
              {selectedValue === "settings" && (
                <Settings
                  theme={theme}
                  setTheme={setTheme}
                  setTabsView={setTabsView}
                />
              )}
            </div>
          </>
        ) : (
          <div>
            <Timers />
            <Settings
              theme={theme}
              setTheme={setTheme}
              setTabsView={setTabsView}
            />
          </div>
        )}
      </div>
    </FluentProvider>
  )
}
