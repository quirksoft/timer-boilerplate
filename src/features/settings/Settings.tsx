import { Radio, RadioGroup, Checkbox, Button } from "@fluentui/react-components"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  toggleTabs,
  setTheme,
  togglePreserveLocalTimer,
  selectPreserveLocalTimer,
} from "@/features/settings/slice"
import { selectTabsView, selectTheme } from "@/features/settings/slice"

export const Settings = () => {
  const dispatch = useAppDispatch()
  const tabsView = useAppSelector(selectTabsView)
  const theme = useAppSelector(selectTheme)
  const preserve = useAppSelector(selectPreserveLocalTimer)

  return (
    <>
      <label>Theme</label>
      <RadioGroup
        layout="horizontal"
        onChange={(_, data) => dispatch(setTheme(data.value))}
        aria-label="theme"
      >
        <Radio value="dark" label="dark" checked={theme === "dark"} />
        <Radio value="light" label="light" checked={theme === "light"} />
      </RadioGroup>
      <Checkbox
        checked={preserve}
        onChange={() => dispatch(togglePreserveLocalTimer())}
        label="Preserve local timer between sessions"
      />
      <br />
      <Button onClick={() => dispatch(toggleTabs())}>
        Switch to {tabsView ? "one" : "tabs"} view
      </Button>
    </>
  )
}
