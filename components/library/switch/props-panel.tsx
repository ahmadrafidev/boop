"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { switchConfig } from './config'

export function SwitchPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || switchConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Switch Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="switch-label" className="text-xs font-medium">
            Label
          </Label>
          <Input
            id="switch-label"
            value={String(currentProps.label || "")}
            onChange={(e) => handlePropChange("label", e.target.value)}
            placeholder="Switch label"
            className="text-xs"
          />
        </div>

        {/* Checked */}
        <div className="flex items-center justify-between">
          <Label htmlFor="switch-checked" className="text-xs font-medium">
            Checked
          </Label>
          <Switch
            id="switch-checked"
            checked={Boolean(currentProps.checked)}
            onCheckedChange={(checked) => handlePropChange("checked", checked)}
          />
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="switch-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="switch-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 