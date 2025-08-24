import {
  Field,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
} from "@fluentui/react-components"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  toggleTabs,
  setTheme,
  togglePreserveLocalTimer,
} from "@/features/settings/slice"
import { selectTabsView, selectTheme } from "@/features/settings/slice"

export const Settings = () => {
  const dispatch = useAppDispatch()
  const tabsView = useAppSelector(selectTabsView)
  const theme = useAppSelector(selectTheme)

  return (
    <>
      <Field label="Theme">
        <RadioGroup
          layout="horizontal"
          onChange={(_, data) => dispatch(setTheme(data.value))}
        >
          <Radio value="dark" label="dark" checked={theme === "dark"} />
          <Radio value="light" label="light" checked={theme === "light"} />
        </RadioGroup>
      </Field>
      <Checkbox
        // checked={checked}
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
