import type { ComponentConfig } from '../types'
import { ModalRenderer } from './renderer'
import { ModalPropsPanel } from './props-panel'
import { ModalDocumentation } from './docs'

export const modalConfig: ComponentConfig = {
  definition: {
    type: "Modal",
    name: "Modal",
    icon: "Square",
    description: "An overlay dialog component that displays content above the main interface and requires user interaction",
    defaultProps: {
      title: "Modal Title",
      description: "Modal description goes here",
      triggerText: "Open Modal",
    },
    propTypes: {
      title: { 
        type: "string",
        description: "The title displayed in the modal header"
      },
      description: { 
        type: "string",
        description: "The description text shown in the modal body"
      },
      triggerText: { 
        type: "string",
        description: "The text on the button that opens the modal"
      },
    },
  },
  render: ModalRenderer,
  PropsPanel: ModalPropsPanel,
  Documentation: ModalDocumentation,
} 