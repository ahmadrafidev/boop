import type { ComponentConfig } from '../types'
import { ProgressRenderer } from './renderer'
import { ProgressPropsPanel } from './props-panel'
import { ProgressDocumentation } from './docs'

export const progressConfig: ComponentConfig = {
  definition: {
    type: "Progress",
    name: "Progress",
    icon: "BarChart",
    description: "A visual indicator for displaying the progress or completion status of an operation with optional label",
    defaultProps: {
      value: 50,
      max: 100,
      showLabel: true,
    },
    propTypes: {
      value: { 
        type: "string",
        description: "The current value of the progress indicator"
      },
      max: { 
        type: "string",
        description: "The maximum value for the progress indicator"
      },
      showLabel: { 
        type: "boolean",
        description: "Whether to show the value labels below the progress bar"
      },
    },
  },
  render: ProgressRenderer,
  PropsPanel: ProgressPropsPanel,
  Documentation: ProgressDocumentation,
} 