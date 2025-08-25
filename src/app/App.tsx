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
import { Timers } from "@/features/timers/Timers"
import { Settings } from "@/features/settings/Settings"
import { selectTabsView, selectTheme } from "@/features/settings/slice"
import { TabsView } from "@/components/TabsView"
import { useTicker } from "@/hooks/useTicker"

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
  useTicker(250)

  const tabsView: boolean = useAppSelector(selectTabsView)
  const theme: string = useAppSelector(selectTheme)

  const [selectedTab, setSelectedTab] = useState<string>("timers")

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string)
  }

  const tabs = [
    { id: "timers", label: "Timers", icon: <TimerIcon />, content: <Timers /> },
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
            <Timers />
            <Settings />
          </div>
        )}
      </div>
    </FluentProvider>
  )
}
