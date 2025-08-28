import { useState, useEffect, FormEvent } from "react"
import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  Input,
  Label,
  Button,
  makeStyles,
  useId,
  Spinner,
} from "@fluentui/react-components"
import { useAppSelector, useAppDispatch } from "@/app/hooks"
import { selectAllTimers, selectTimersStatus } from "@/features/timers/slice"
import { fetchTimers, createTimer } from "@/features/timers/thunks"
import LocalTimer from "@/features/timer/LocalTimer"
import ServerTimer from "../timer/ServerTimer"
import { resetTimer } from "../timer/slice"
import { LOCAL } from "@/app/constants"

const columns = [
  { columnKey: "name", label: "Name" },
  { columnKey: "value", label: "Value" },
  { columnKey: "action", label: "Action" },
]

const useStyles = makeStyles({
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "42px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
    padding: "20px 0 0 20px",
  },
})

export const Timers = () => {
  const inputId = useId("input")
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const timers = useAppSelector(selectAllTimers)
  const timersStatus = useAppSelector(selectTimersStatus)
  const [newTimerName, setNewTimerName] = useState<string>("")

  useEffect(() => {
    if (timersStatus === "idle") {
      dispatch(fetchTimers())
    }

    const interval = setInterval(() => {
      dispatch(fetchTimers())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (newTimerName === LOCAL) {
      dispatch(resetTimer())
    } else {
      dispatch(createTimer(newTimerName))
    }

    setNewTimerName("")
  }

  return (
    <>
      <Table arial-label="Timers table" style={{ marginTop: "20px" }}>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column.columnKey}>
                {column.label}
              </TableHeaderCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <LocalTimer />
          {timers.map(([id, timer]) => (
            <ServerTimer key={id} id={id} {...timer} />
          ))}
        </TableBody>
      </Table>
      <div className={styles.spinnerContainer}>
        {timersStatus === "idle" && <Spinner label="Loading..." />}
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <Label htmlFor={inputId}>New timer</Label>
        <div>
          <Input
            id={inputId}
            value={newTimerName}
            onChange={e => setNewTimerName(e.target.value)}
            title="Enter the name of a new timer"
            placeholder="Enter the name"
          />
          <Button disabled={newTimerName.length === 0} type="submit">
            add
          </Button>
        </div>
      </form>
    </>
  )
}
