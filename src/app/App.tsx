import { useState } from "react"
import {
  FluentProvider,
  webLightTheme,
  webDarkTheme,
  makeStaticStyles,
} from "@fluentui/react-components"
import {
  WrenchSettingsFilled,
  WrenchSettingsRegular,
  TimerFilled,
  TimerRegular,
  bundleIcon,
} from "@fluentui/react-icons"
import type { Theme } from "@fluentui/react-components"
import { useAppSelector } from "@/app/hooks"
import type { SelectTabData, SelectTabEvent } from "@fluentui/react-components"
import { TimersList } from "@/features/timersList/TimersList"
import { NewTimerForm } from "@/features/newTimerForm/NewTimerForm"
import { Settings } from "@/features/settings/Settings"
import { selectTabsView, selectTheme } from "@/features/settings/slice"
import { TabsView } from "@/components/TabsView"
import { useTimer } from "@/hooks/useTicker"
import { FREQUENCY_MS } from "./constants"
import type { AppTheme } from "./types"

const TimerIcon = bundleIcon(TimerFilled, TimerRegular)
const SettingsIcon = bundleIcon(WrenchSettingsFilled, WrenchSettingsRegular)

const useGlobalStyles = makeStaticStyles([
  "html, body, #root, .App { margin: 0; padding: 0; min-height: 100vh; }",
])

const THEMES: { [K in AppTheme]: Theme } = {
  dark: webDarkTheme,
  light: webLightTheme,
}

export const App = () => {
  useGlobalStyles()
  useTimer(FREQUENCY_MS)

  const tabsView: boolean = useAppSelector(selectTabsView)
  const theme: AppTheme = useAppSelector(selectTheme)

  const [selectedTab, setSelectedTab] = useState<string>("timers")

  const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string)
  }

  const tabs = [
    {
      id: "timers",
      label: "Timers",
      icon: <TimerIcon />,
      content: (
        <>
          <TimersList />
          <NewTimerForm />
        </>
      ),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <SettingsIcon />,
      content: <Settings />,
    },
  ]

  return (
    <FluentProvider theme={THEMES[theme]}>
      <div className="App">
        {tabsView ? (
          <TabsView
            tabs={tabs}
            selected={selectedTab}
            onTabSelect={onTabSelect}
          />
        ) : (
          <div>
            <TimersList />
            <NewTimerForm />
            <Settings />
          </div>
        )}
      </div>
    </FluentProvider>
  )
}
