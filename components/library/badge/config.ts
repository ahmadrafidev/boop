import type { ComponentConfig } from '../types'
import { BadgeRenderer } from './renderer'
import { BadgePropsPanel } from './props-panel'
import { BadgeDocumentation } from './docs'

export const badgeConfig: ComponentConfig = {
  definition: {
    type: "Badge",
    name: "Badge",
    icon: "Tag",
    description: "A compact component for displaying status, labels, or counts with various visual styles",
    defaultProps: {
      children: "Badge",
      variant: "default",
    },
    propTypes: {
      children: { 
        type: "string",
        description: "The text content displayed inside the badge"
      },
      variant: {
        type: "select",
        options: ["default", "secondary", "destructive", "outline"],
        description: "The visual style variant of the badge"
      },
    },
  },
  render: BadgeRenderer,
  PropsPanel: BadgePropsPanel,
  Documentation: BadgeDocumentation,
} 