import { useAppSelector } from "@/app/hooks"
import {
  selectLocalTimer,
  selectStart,
  resetTimer,
} from "@/features/timer/slice"
import { formatTime } from "@/helpers.ts/formatTime"
import { TableRow, TableCell, Button } from "@fluentui/react-components"
import { useAppDispatch } from "@/app/hooks"
import { LOCAL } from "@/app/constants"

export default function LocalTimer() {
  useAppSelector(selectLocalTimer)
  const start = useAppSelector(selectStart)
  const now = Date.now() / 1000
  const dispatch = useAppDispatch()

  return (
    <TableRow key={LOCAL}>
      <TableCell>{LOCAL}</TableCell>
      <TableCell>{formatTime(now - start)}</TableCell>
      <TableCell>
        <Button onClick={() => dispatch(resetTimer())}>reset</Button>
      </TableCell>
    </TableRow>
  )
}
