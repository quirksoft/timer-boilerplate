import { Spinner, SpinnerProps } from "@fluentui/react-components"
import { selectTheme } from "@/features/settings/slice"
import { useAppSelector } from "@/app/hooks"

export function ThemeSpinner(props: SpinnerProps) {
  const theme = useAppSelector(selectTheme)

  return (
    <Spinner
      appearance={theme === "dark" ? "inverted" : "primary"}
      {...props}
    />
  )
}
