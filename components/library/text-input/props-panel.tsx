"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { textInputConfig } from './config'

export function TextInputPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || textInputConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Text Input Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="textinput-label" className="text-xs font-medium">
            Label
          </Label>
          <Input
            id="textinput-label"
            value={String(currentProps.label || "")}
            onChange={(e) => handlePropChange("label", e.target.value)}
            placeholder="Field label"
            className="text-xs"
          />
        </div>

        {/* Placeholder */}
        <div className="space-y-2">
          <Label htmlFor="textinput-placeholder" className="text-xs font-medium">
            Placeholder
          </Label>
          <Input
            id="textinput-placeholder"
            value={String(currentProps.placeholder || "")}
            onChange={(e) => handlePropChange("placeholder", e.target.value)}
            placeholder="Enter placeholder text"
            className="text-xs"
          />
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Input Type</Label>
          <Select
            value={String(currentProps.type || "text")}
            onValueChange={(value) => handlePropChange("type", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="password">Password</SelectItem>
              <SelectItem value="number">Number</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Disabled */}
        <div className="flex items-center justify-between">
          <Label htmlFor="textinput-disabled" className="text-xs font-medium">
            Disabled
          </Label>
          <Switch
            id="textinput-disabled"
            checked={Boolean(currentProps.disabled)}
            onCheckedChange={(checked) => handlePropChange("disabled", checked)}
          />
        </div>
      </CardContent>
    </Card>
  )
} 