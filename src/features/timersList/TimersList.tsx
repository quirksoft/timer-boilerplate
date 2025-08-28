import { useEffect } from "react"
import {
  TableBody,
  TableRow,
  Table,
  TableHeader,
  TableHeaderCell,
  makeStyles,
  Spinner,
} from "@fluentui/react-components"
import { useAppSelector, useAppDispatch } from "@/app/hooks"
import {
  selectAllTimers,
  selectIsInitialLoading,
  selectTimersStatus,
  selectTimersError,
} from "@/features/timersList/slice"
import { fetchTimers } from "@/features/timersList/thunks"
import LocalTimer from "@/features/timer/LocalTimer"
import ServerTimer from "@/features/timer/ServerTimer"
import { ThemeSpinner } from "@/components/ThemeSpinner"

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
})

export const TimersList = () => {
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const timers = useAppSelector(selectAllTimers)
  const timersStatus = useAppSelector(selectTimersStatus)
  const isInitialLoading = useAppSelector(selectIsInitialLoading)
  const error = useAppSelector(selectTimersError)

  useEffect(() => {
    if (timersStatus === "idle") {
      dispatch(fetchTimers())
    }

    const interval = setInterval(() => {
      dispatch(fetchTimers())
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Table arial-label="Timers table">
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
        {timersStatus === "pending" && isInitialLoading && (
          <ThemeSpinner label="Loading..." />
        )}
        {timersStatus === "failed" && (
          <span style={{ color: "red", marginLeft: "10px" }}>{error}</span>
        )}
      </div>
    </>
  )
}
