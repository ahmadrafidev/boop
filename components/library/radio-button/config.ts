import type { ComponentConfig } from '../types'
import { RadioButtonRenderer } from './renderer'
import { RadioButtonPropsPanel } from './props-panel'
import { RadioButtonDocumentation } from './docs'

export const radioButtonConfig: ComponentConfig = {
  definition: {
    type: "RadioButton",
    name: "Radio Group",
    icon: "Circle",
    description: "A form control for selecting a single option from a list of mutually exclusive choices",
    defaultProps: {
      label: "Choose Option",
      defaultValue: "Option 1",
      disabled: false,
    },
    propTypes: {
      label: { 
        type: "string",
        description: "The label text displayed above the radio group"
      },
      defaultValue: { 
        type: "string",
        description: "The default selected option value"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the entire radio group is disabled"
      },
    },
  },
  render: RadioButtonRenderer,
  PropsPanel: RadioButtonPropsPanel,
  Documentation: RadioButtonDocumentation,
} 