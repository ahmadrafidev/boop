"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import type { ComponentPropsPanelProps } from '../types'
import { modalConfig } from './config'

export function ModalPropsPanel({ 
  instance, 
  onUpdateProps, 
  previewProps, 
  onPreviewPropsChange 
}: ComponentPropsPanelProps) {
  const currentProps = instance?.props || previewProps || modalConfig.definition.defaultProps
  
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
        <CardTitle className="text-sm">Modal Properties</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Trigger Text */}
        <div className="space-y-2">
          <Label htmlFor="modal-trigger" className="text-xs font-medium">
            Trigger Text
          </Label>
          <Input
            id="modal-trigger"
            value={String(currentProps.triggerText || "")}
            onChange={(e) => handlePropChange("triggerText", e.target.value)}
            placeholder="Open Modal"
            className="text-xs"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="modal-title" className="text-xs font-medium">
            Modal Title
          </Label>
          <Input
            id="modal-title"
            value={String(currentProps.title || "")}
            onChange={(e) => handlePropChange("title", e.target.value)}
            placeholder="Modal Title"
            className="text-xs"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="modal-description" className="text-xs font-medium">
            Description
          </Label>
          <Textarea
            id="modal-description"
            value={String(currentProps.description || "")}
            onChange={(e) => handlePropChange("description", e.target.value)}
            placeholder="Modal description goes here"
            className="text-xs resize-none"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
} 