import {
  Radio,
  RadioGroup,
  Checkbox,
  Button,
  makeStyles,
} from "@fluentui/react-components"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import {
  toggleTabs,
  setTheme,
  togglePreserveLocalTimer,
  selectPreserveLocalTimer,
} from "@/features/settings/slice"
import { selectTabsView, selectTheme } from "@/features/settings/slice"
import type { AppTheme } from "@/app/types"
import { THEME } from "@/app/constants"

const useStyles = makeStyles({
  container: {
    margin: "20px 0 0 20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
})

export const Settings = () => {
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const tabsView = useAppSelector(selectTabsView)
  const theme = useAppSelector(selectTheme)
  const preserve = useAppSelector(selectPreserveLocalTimer)

  return (
    <div className={styles.container}>
      <label>Theme</label>
      <RadioGroup
        layout="horizontal"
        onChange={(_, data) => dispatch(setTheme(data.value as AppTheme))}
        aria-label="theme"
      >
        <Radio
          value={THEME.dark}
          label={THEME.dark}
          checked={theme === THEME.dark}
        />
        <Radio
          value={THEME.light}
          label={THEME.light}
          checked={theme === THEME.light}
        />
      </RadioGroup>
      <Checkbox
        checked={preserve}
        onChange={() => dispatch(togglePreserveLocalTimer())}
        label="Preserve local timer between sessions"
      />
      <Button
        onClick={() => dispatch(toggleTabs())}
        style={{ alignSelf: "flex-start" }}
      >
        Switch to {tabsView ? "one" : "tabs"} view
      </Button>
    </div>
  )
}
