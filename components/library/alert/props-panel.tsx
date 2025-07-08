"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ComponentPropsPanelProps } from '../types'
import { alertConfig } from './config'

export function AlertPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || alertConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Alert Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="alert-title" className="text-xs font-medium">
            Title
          </Label>
          <Input
            id="alert-title"
            value={String(currentProps.title || "")}
            onChange={(e) => handlePropChange("title", e.target.value)}
            placeholder="Alert title"
            className="text-xs"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="alert-description" className="text-xs font-medium">
            Description
          </Label>
          <Textarea
            id="alert-description"
            value={String(currentProps.description || "")}
            onChange={(e) => handlePropChange("description", e.target.value)}
            placeholder="Alert description"
            className="text-xs resize-none"
            rows={3}
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
              <SelectItem value="destructive">Destructive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 