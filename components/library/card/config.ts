import type { ComponentConfig } from '../types'
import { CardRenderer } from './renderer'
import { CardPropsPanel } from './props-panel'
import { CardDocumentation } from './docs'

export const cardConfig: ComponentConfig = {
  definition: {
    type: "Card",
    name: "Card",
    icon: "CreditCard",
    description: "A container component for organizing related content with optional header, footer, and content sections",
    defaultProps: {
      title: "Card Title",
      content: "Card content goes here",
      variant: "default",
    },
    propTypes: {
      title: { 
        type: "string",
        description: "The title displayed in the card header"
      },
      content: { 
        type: "string",
        description: "The main content text displayed in the card body"
      },
      variant: { 
        type: "select", 
        options: ["default", "outline"],
        description: "The visual style variant of the card"
      },
    },
  },
  render: CardRenderer,
  PropsPanel: CardPropsPanel,
  Documentation: CardDocumentation,
} 