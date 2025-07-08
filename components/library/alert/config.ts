import type { ComponentConfig } from '../types'
import { AlertRenderer } from './renderer'
import { AlertPropsPanel } from './props-panel'
import { AlertDocumentation } from './docs'

export const alertConfig: ComponentConfig = {
  definition: {
    type: "Alert",
    name: "Alert",
    icon: "AlertCircle",
    description: "Display important messages and notifications to users with different severity levels",
    defaultProps: {
      title: "Alert Title",
      description: "This is an alert description",
      variant: "default",
    },
    propTypes: {
      title: { 
        type: "string",
        description: "The title text displayed in the alert header"
      },
      description: { 
        type: "string",
        description: "The descriptive text displayed in the alert body"
      },
      variant: { 
        type: "select", 
        options: ["default", "destructive"],
        description: "The visual style and semantic meaning of the alert"
      },
    },
  },
  render: AlertRenderer,
  PropsPanel: AlertPropsPanel,
  Documentation: AlertDocumentation,
} 