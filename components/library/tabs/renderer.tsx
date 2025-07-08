"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ComponentInstance } from '../types'

interface TabsRendererProps {
  instance: ComponentInstance
  isSelected: boolean
  onClick: () => void
}

export function TabsRenderer({ instance, isSelected, onClick }: TabsRendererProps) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const tabData = [
    { value: "Tab 1", label: "Tab 1", content: "Content for Tab 1" },
    { value: "Tab 2", label: "Tab 2", content: "Content for Tab 2" },
    { value: "Tab 3", label: "Tab 3", content: "Content for Tab 3" },
  ]

  return (
    <div key={instance.id} className={`${baseClasses} w-80 p-2 rounded`} onClick={onClick}>
      <Tabs 
        defaultValue={String(props.defaultValue || "Tab 1")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          {tabData.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value}
              disabled={Boolean(props.disabled)}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            <div className="p-4 border rounded-lg bg-muted/20">
              <p className="text-sm">{tab.content}</p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 