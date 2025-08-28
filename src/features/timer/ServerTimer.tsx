import { useAppSelector } from "@/app/hooks"
import { TableCell, TableRow, Button } from "@fluentui/react-components"
import { selectLocalTimer } from "./slice"
import { TimerWithId } from "@/features/timersList/types"
import { formatTime } from "@/helpers.ts/formatTime"
import { useAppDispatch } from "@/app/hooks"
import { createTimer } from "@/features/timersList/thunks"
import { name } from "@/features/timersList/slice"

export default function ServerTimer({ id, elapsed, receivedAt }: TimerWithId) {
  useAppSelector(selectLocalTimer)
  const now = Date.now() / 1000
  const dispatch = useAppDispatch()

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{formatTime(elapsed + (now - receivedAt))}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            dispatch(createTimer({ id, source: name }))
          }}
        >
          reset
        </Button>
      </TableCell>
    </TableRow>
  )
}
