import { Spinner, SpinnerProps } from "@fluentui/react-components"
import { selectTheme } from "@/features/settings/slice"
import { useAppSelector } from "@/app/hooks"
import { THEME } from "@/app/constants"

export function ThemeSpinner(props: SpinnerProps) {
  const theme = useAppSelector(selectTheme)

  return (
    <Spinner
      appearance={theme === THEME.dark ? "inverted" : "primary"}
      {...props}
    />
  )
}
