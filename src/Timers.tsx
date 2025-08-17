import {
  TableBody,
  TableCell,
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

const items = [
  {
    name: "name",
    value: "value",
    action: "action",
  },
  // {
  //   file: { label: "Meeting notes", icon: <DocumentRegular /> },
  //   author: { label: "Max Mustermann", status: "available" },
  //   lastUpdated: { label: "7h ago", timestamp: 1 },
  //   lastUpdate: {
  //     label: "You edited this",
  //     icon: <EditRegular />,
  //   },
  // },
  // {
  //   file: { label: "Thursday presentation", icon: <FolderRegular /> },
  //   author: { label: "Erika Mustermann", status: "busy" },
  //   lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
  //   lastUpdate: {
  //     label: "You recently opened this",
  //     icon: <OpenRegular />,
  //   },
  // },
  // {
  //   file: { label: "Training recording", icon: <VideoRegular /> },
  //   author: { label: "John Doe", status: "away" },
  //   lastUpdated: { label: "Yesterday at 1:45 PM", timestamp: 2 },
  //   lastUpdate: {
  //     label: "You recently opened this",
  //     icon: <OpenRegular />,
  //   },
  // },
  // {
  //   file: { label: "Purchase order", icon: <DocumentPdfRegular /> },
  //   author: { label: "Jane Doe", status: "offline" },
  //   lastUpdated: { label: "Tue at 9:30 AM", timestamp: 3 },
  //   lastUpdate: {
  //     label: "You shared this in a Teams chat",
  //     icon: <PeopleRegular />,
  //   },
  // },
]

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
    // Stack the label above the field
    display: "flex",
    flexDirection: "column",
    // Use 2px gap below the label (per the design system)
    gap: "2px",
    // Prevent the example from taking the full width of the page (optional)
    maxWidth: "400px",
  },
})

export const Timers = () => {
  const inputId = useId("input")
  const styles = useStyles()

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
          {items.map(item => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell>{item.action}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.input}>
        <Label htmlFor={inputId}>New timer</Label>
        <div>
          <Input id={inputId} />
          <Button>add</Button>
        </div>
      </div>
    </>
  )
}
