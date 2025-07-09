"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ComponentInstance } from '../types'

export function TabsRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const tabs = props.tabs ? String(props.tabs).split(',').map(tab => tab.trim()) : ['Tab 1', 'Tab 2', 'Tab 3']

  return (
    <div key={instance.id} className={`${baseClasses} w-80 p-2 rounded`} onClick={onClick}>
      <Tabs defaultValue={tabs[0]} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          {tabs.map((tab, index) => (
            <TabsTrigger key={index} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab, index) => (
          <TabsContent key={index} value={tab}>
            <div className="py-4">
              <p className="text-sm text-muted-foreground">
                Content for {tab}
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
} 