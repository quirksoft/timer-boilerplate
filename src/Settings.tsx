import * as React from "react"
import {
  Field,
  Radio,
  RadioGroup,
  Checkbox,
  Button,
} from "@fluentui/react-components"
import type { CheckboxProps } from "@fluentui/react-components"

export const Settings = (props: any) => {
  const [checked, setChecked] = React.useState<CheckboxProps["checked"]>(true)

  return (
    <>
      <Field label="Theme">
        <RadioGroup
          layout="horizontal"
          onChange={(_, data) => props.setTheme(data.value)}
        >
          <Radio value="dark" label="dark" checked={props.theme === "dark"} />
          <Radio
            value="light"
            label="light"
            checked={props.theme === "light"}
          />
        </RadioGroup>
      </Field>
      <Checkbox
        checked={checked}
        onChange={(ev, data) => setChecked(data.checked)}
        label="Preserve local timer between sessions"
      />
      <br />
      <Button onClick={() => props.setTabsView((prev: boolean) => !prev)}>
        Switch to tabs/one view
      </Button>
    </>
  )
}
