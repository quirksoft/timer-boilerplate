import { ReactNode, useState } from "react"
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
}

export function TabsView({ tabs, selected }: TabsViewProps) {
  const [selectedTab, setSelectedTab] = useState<string>(selected)

  const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
    setSelectedTab(data.value as string)
  }

  return (
    <>
      <TabList selectedValue={selectedTab} onTabSelect={onTabSelect}>
        {tabs.map(({ id, icon, label }) => (
          <Tab key={id} id={id} icon={icon} value={id}>
            {label}
          </Tab>
        ))}
      </TabList>

      <div>{tabs.find(tab => tab.id === selectedTab)?.content}</div>
    </>
  )
}
