"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { comboboxConfig } from './config'

export function ComboboxPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || comboboxConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Combobox Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Placeholder */}
        <div className="space-y-2">
          <Label htmlFor="combobox-placeholder" className="text-xs font-medium">
            Placeholder Text
          </Label>
          <Input
            id="combobox-placeholder"
            value={String(currentProps.placeholder || "")}
            onChange={(e) => handlePropChange("placeholder", e.target.value)}
            placeholder="Select option..."
            className="text-xs"
          />
        </div>

        {/* Search Placeholder */}
        <div className="space-y-2">
          <Label htmlFor="combobox-search" className="text-xs font-medium">
            Search Placeholder
          </Label>
          <Input
            id="combobox-search"
            value={String(currentProps.searchPlaceholder || "")}
            onChange={(e) => handlePropChange("searchPlaceholder", e.target.value)}
            placeholder="Search..."
            className="text-xs"
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="combobox-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="combobox-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>

        <div className="text-xs text-muted-foreground mt-4 p-2 bg-muted rounded">
          <p>Note: This component uses predefined options (Option 1-4) for the design tool demo.</p>
        </div>
      </CardContent>
    </Card>
  )
} 