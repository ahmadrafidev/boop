"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { tabsConfig } from './config'

export function TabsPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || tabsConfig.definition.defaultProps
  
  const handlePropChange = (propName: string, value: string | number | boolean | undefined) => {
    if (instance) {
      onUpdateProps(instance.id, { ...instance.props, [propName]: value })
    } else {
      const newProps = { ...currentProps, [propName]: value }
      onPreviewPropsChange?.(newProps)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Tabs Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Default Active Tab */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Default Active Tab</Label>
          <Select
            value={String(currentProps.defaultValue || "Tab 1")}
            onValueChange={(value) => handlePropChange("defaultValue", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tab 1">Tab 1</SelectItem>
              <SelectItem value="Tab 2">Tab 2</SelectItem>
              <SelectItem value="Tab 3">Tab 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="tabs-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="tabs-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted rounded">
          <p>Note: This component uses predefined tabs (Tab 1, Tab 2, Tab 3) for the design tool demo.</p>
        </div>
      </CardContent>
    </Card>
  )
} 