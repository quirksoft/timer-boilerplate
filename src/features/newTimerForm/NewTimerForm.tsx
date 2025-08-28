import { useState, FormEvent } from "react"
import {
  Input,
  Label,
  Button,
  makeStyles,
  useId,
} from "@fluentui/react-components"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { createTimer } from "@/features/timersList/thunks"
import { resetTimer } from "@/features/timer/slice"
import {
  selectFormStatus,
  selectFormError,
} from "@/features/newTimerForm/slice"
import { LOCAL } from "@/app/constants"
import { name } from "@/features/newTimerForm/slice"
import { ThemeSpinner } from "@/components/ThemeSpinner"

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "20px 0 0 20px",
  },
  input: {
    marginRight: "10px",
  },
})

export const NewTimerForm = () => {
  const inputId = useId("input")
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const status = useAppSelector(selectFormStatus)
  const error = useAppSelector(selectFormError)
  const [newTimerName, setNewTimerName] = useState<string>("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (newTimerName === LOCAL) {
      dispatch(resetTimer())
    } else {
      dispatch(createTimer({ id: newTimerName, source: name }))
    }

    setNewTimerName("")
  }

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Label htmlFor={inputId}>New timer</Label>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Input
          id={inputId}
          className={styles.input}
          value={newTimerName}
          onChange={e => setNewTimerName(e.target.value)}
          title="Enter the name of a new timer"
          placeholder="Enter the name"
        />
        <Button
          appearance="primary"
          disabled={newTimerName.length === 0}
          type="submit"
        >
          add
        </Button>
        {status === "pending" && (
          <ThemeSpinner size="tiny" style={{ marginLeft: "10px" }} />
        )}
        {status === "failed" && (
          <span style={{ color: "red", marginLeft: "10px" }}>{error}</span>
        )}
      </div>
    </form>
  )
}
