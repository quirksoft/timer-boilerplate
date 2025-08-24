import type { ReactNode } from "react"
import { TabList, Tab } from "@fluentui/react-components"
import type {
  TabSlots,
  SelectTabData,
  SelectTabEvent,
} from "@fluentui/react-components"

type TabConfig = {
  id: string
  label: string
  icon?: TabSlots["icon"]
  content: ReactNode
}

interface TabsViewProps {
  tabs: TabConfig[]
  selected: string
  onTabSelect: (event: SelectTabEvent, data: SelectTabData) => void
}

export function TabsView({ tabs, selected, onTabSelect }: TabsViewProps) {
  return (
    <>
      <TabList selectedValue={selected} onTabSelect={onTabSelect}>
        {tabs.map(({ id, icon, label }) => (
          <Tab key={id} id={id} icon={icon} value={id}>
            {label}
          </Tab>
        ))}
      </TabList>

      <div>{tabs.find(tab => tab.id === selected)?.content}</div>
    </>
  )
}
