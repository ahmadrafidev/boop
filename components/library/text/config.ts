import type { ComponentConfig } from '../types'
import { TextRenderer } from './renderer'
import { TextPropsPanel } from './props-panel'
import { TextDocumentation } from './docs'

export const textConfig: ComponentConfig = {
  definition: {
    type: "Text",
    name: "Text",
    icon: "FileText",
    description: "A typography component for displaying text content with various sizes, weights, and styles",
    defaultProps: {
      children: "Sample text",
      size: "default",
      variant: "default",
    },
    propTypes: {
      children: { 
        type: "string",
        description: "The text content to display"
      },
      size: { 
        type: "select", 
        options: ["sm", "default", "lg", "xl"],
        description: "The size of the text"
      },
      variant: { 
        type: "select", 
        options: ["default", "muted", "destructive"],
        description: "The visual style variant of the text"
      },
    },
  },
  render: TextRenderer,
  PropsPanel: TextPropsPanel,
  Documentation: TextDocumentation,
} 