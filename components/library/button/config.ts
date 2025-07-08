import type { ComponentConfig } from '../types'
import { ButtonRenderer } from './renderer'
import { ButtonPropsPanel } from './props-panel'
import { ButtonDocumentation } from './docs'

export const buttonConfig: ComponentConfig = {
  definition: {
    type: "Button",
    name: "Button",
    icon: "MousePointer",
    description: "A versatile clickable component with multiple variants and sizes for triggering actions or navigation",
    defaultProps: {
      children: "Button",
      variant: "default",
      size: "default",
      disabled: false,
    },
    propTypes: {
      children: { 
        type: "string",
        description: "The text content displayed inside the button"
      },
      variant: {
        type: "select",
        options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
        description: "The visual style variant of the button"
      },
      size: {
        type: "select",
        options: ["default", "sm", "lg", "icon"],
        description: "The size of the button"
      },
      disabled: {
        type: "boolean",
        description: "Whether the button is disabled and non-interactive"
      },
    },
  },
  render: ButtonRenderer,
  PropsPanel: ButtonPropsPanel,
  Documentation: ButtonDocumentation,
} 