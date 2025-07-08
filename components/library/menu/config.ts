import type { ComponentConfig } from '../types'
import { MenuRenderer } from './renderer'
import { MenuPropsPanel } from './props-panel'
import { MenuDocumentation } from './docs'

export const menuConfig: ComponentConfig = {
  definition: {
    type: "Menu",
    name: "Menu",
    icon: "Menu",
    description: "A dropdown menu component that displays a list of actions or navigation options triggered by a button",
    defaultProps: {
      triggerText: "Open Menu",
      disabled: false,
    },
    propTypes: {
      triggerText: { 
        type: "string",
        description: "The text displayed on the trigger button"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the menu is disabled and non-interactive"
      },
    },
  },
  render: MenuRenderer,
  PropsPanel: MenuPropsPanel,
  Documentation: MenuDocumentation,
} 