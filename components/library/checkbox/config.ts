import type { ComponentConfig } from '../types'
import { CheckboxRenderer } from './renderer'
import { CheckboxPropsPanel } from './props-panel'
import { CheckboxDocumentation } from './docs'

export const checkboxConfig: ComponentConfig = {
  definition: {
    type: "Checkbox",
    name: "Checkbox",
    icon: "CheckSquare",
    description: "An interactive form control for binary choices or multiple selections with support for indeterminate state",
    defaultProps: {
      label: "Checkbox",
      checked: false,
      disabled: false,
    },
    propTypes: {
      label: { 
        type: "string",
        description: "The label text displayed next to the checkbox"
      },
      checked: { 
        type: "boolean",
        description: "Whether the checkbox is checked"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the checkbox is disabled and non-interactive"
      },
    },
  },
  render: CheckboxRenderer,
  PropsPanel: CheckboxPropsPanel,
  Documentation: CheckboxDocumentation,
} 