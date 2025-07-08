"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { progressConfig } from './config'

export function ProgressPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || progressConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Progress Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Value */}
        <div className="space-y-2">
          <Label htmlFor="progress-value" className="text-xs font-medium">
            Current Value
          </Label>
          <Input
            id="progress-value"
            type="number"
            value={String(currentProps.value || "")}
            onChange={(e) => handlePropChange("value", e.target.value)}
            placeholder="50"
            className="text-xs"
          />
        </div>

        {/* Maximum Value */}
        <div className="space-y-2">
          <Label htmlFor="progress-max" className="text-xs font-medium">
            Maximum Value
          </Label>
          <Input
            id="progress-max"
            type="number"
            value={String(currentProps.max || "")}
            onChange={(e) => handlePropChange("max", e.target.value)}
            placeholder="100"
            className="text-xs"
          />
        </div>

        {/* Show Label */}
        <div className="flex items-center justify-between">
          <Label htmlFor="progress-showLabel" className="text-xs font-medium">
            Show Value Labels
          </Label>
          <Switch
            id="progress-showLabel"
            checked={Boolean(currentProps.showLabel)}
            onCheckedChange={(checked) => handlePropChange("showLabel", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 