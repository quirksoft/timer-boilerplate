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
} from "@fluentui/react-components"
import { useAppSelector, useAppDispatch } from "@/app/hooks"
import { selectAllTimers, selectTimersStatus } from "@/features/timers/slice"
import { fetchTimers, createTimer } from "@/features/timers/thunks"
import LocalTimer from "@/features/timer/LocalTimer"
import ServerTimer from "../timer/ServerTimer"

const columns = [
  { columnKey: "name", label: "Name" },
  { columnKey: "value", label: "Value" },
  { columnKey: "action", label: "Action" },
]

const useStyles = makeStyles({
  form: {
    display: "flex",
    flexDirection: "row",
  },
  input: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    maxWidth: "400px",
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

    dispatch(createTimer(newTimerName))
  }

  return (
    <>
      <Table arial-label="Timers table" style={{ minWidth: "510px" }}>
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
      <form className={styles.input} onSubmit={onSubmit}>
        <Label htmlFor={inputId}>New timer</Label>
        <div>
          <Input
            id={inputId}
            value={newTimerName}
            onChange={e => setNewTimerName(e.target.value)}
          />
          <Button type="submit">add</Button>
        </div>
      </form>
    </>
  )
}
