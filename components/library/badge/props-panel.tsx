"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ComponentPropsPanelProps } from '../types'
import { badgeConfig } from './config'

export function BadgePropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || badgeConfig.definition.defaultProps
  
  const handlePropChange = (propName: string, value: string | number | boolean | undefined) => {
    if (instance) {
      // Canvas mode - update actual instance
      onUpdateProps(instance.id, { ...instance.props, [propName]: value })
    } else {
      // Preview mode - update preview props
      const newProps = { ...currentProps, [propName]: value }
      onPreviewPropsChange?.(newProps)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Badge Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Text Content */}
        <div className="space-y-2">
          <Label htmlFor="badge-children" className="text-xs font-medium">
            Text Content
          </Label>
          <Input
            id="badge-children"
            value={String(currentProps.children || "")}
            onChange={(e) => handlePropChange("children", e.target.value)}
            placeholder="Badge text"
            className="text-xs"
          />
        </div>

        {/* Variant */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Variant</Label>
          <Select
            value={String(currentProps.variant || "default")}
            onValueChange={(value) => handlePropChange("variant", value)}
          >
            <SelectTrigger className="text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="secondary">Secondary</SelectItem>
              <SelectItem value="destructive">Destructive</SelectItem>
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 