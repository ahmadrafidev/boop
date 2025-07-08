import type { ComponentConfig } from '../types'
import { SwitchRenderer } from './renderer'
import { SwitchPropsPanel } from './props-panel'
import { SwitchDocumentation } from './docs'

export const switchConfig: ComponentConfig = {
  definition: {
    type: "Switch",
    name: "Switch",
    icon: "ToggleLeft",
    description: "A toggle component for switching between two states with a sliding animation effect",
    defaultProps: {
      label: "Switch",
      checked: false,
      disabled: false,
    },
    propTypes: {
      label: { 
        type: "string",
        description: "The label text displayed next to the switch"
      },
      checked: { 
        type: "boolean",
        description: "Whether the switch is checked/enabled"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the switch is disabled and non-interactive"
      },
    },
  },
  render: SwitchRenderer,
  PropsPanel: SwitchPropsPanel,
  Documentation: SwitchDocumentation,
} 