"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ComponentPropsPanelProps } from '../types'
import { cardConfig } from './config'

export function CardPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || cardConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Card Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="card-title" className="text-xs font-medium">
            Title
          </Label>
          <Input
            id="card-title"
            value={String(currentProps.title || "")}
            onChange={(e) => handlePropChange("title", e.target.value)}
            placeholder="Card title"
            className="text-xs"
          />
        </div>

        {/* Content */}
        <div className="space-y-2">
          <Label htmlFor="card-content" className="text-xs font-medium">
            Content
          </Label>
          <Textarea
            id="card-content"
            value={String(currentProps.content || "")}
            onChange={(e) => handlePropChange("content", e.target.value)}
            placeholder="Card content"
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
              <SelectItem value="outline">Outline</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
} 