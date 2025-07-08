import type React from "react"

export type ComponentProps = Record<string, string | number | boolean | undefined>

export interface ComponentInstance {
  id: string
  type: string
  props: ComponentProps
  position: { x: number; y: number }
}

export type PropType = {
  type: "string" | "boolean" | "select"
  options?: string[]
  description?: string
}

export interface ComponentDefinition {
  type: string
  name: string
  icon: string
  description: string
  defaultProps: ComponentProps
  propTypes: Record<string, PropType>
}

export interface ComponentConfig {
  definition: ComponentDefinition
  render: (instance: ComponentInstance, isSelected: boolean, onClick: () => void) => React.ReactElement
  PropsPanel: React.ComponentType<ComponentPropsPanelProps>
  Documentation: React.ComponentType
}

export interface ComponentPropsPanelProps {
  instance: ComponentInstance | null
  onUpdateProps: (instanceId: string, newProps: ComponentProps) => void
  previewProps?: ComponentProps
  onPreviewPropsChange?: (newProps: ComponentProps) => void
} 