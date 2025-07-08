import type { ComponentConfig } from '../types'
import { TooltipRenderer } from './renderer'
import { TooltipPropsPanel } from './props-panel'
import { TooltipDocumentation } from './docs'

export const tooltipConfig: ComponentConfig = {
  definition: {
    type: "Tooltip",
    name: "Tooltip",
    icon: "HelpCircle",
    description: "A floating component that provides additional information or context when hovering over an element",
    defaultProps: {
      children: "Hover me",
      content: "Tooltip content",
      disabled: false,
    },
    propTypes: {
      children: { 
        type: "string",
        description: "The trigger text that users hover to see the tooltip"
      },
      content: { 
        type: "string",
        description: "The tooltip content text that appears on hover"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the tooltip is disabled and won't show"
      },
    },
  },
  render: TooltipRenderer,
  PropsPanel: TooltipPropsPanel,
  Documentation: TooltipDocumentation,
} 