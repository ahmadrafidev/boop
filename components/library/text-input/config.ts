import type { ComponentConfig } from '../types'
import { TextInputRenderer } from './renderer'
import { TextInputPropsPanel } from './props-panel'
import { TextInputDocumentation } from './docs'

export const textInputConfig: ComponentConfig = {
  definition: {
    type: "TextInput",
    name: "Text Input",
    icon: "Edit3",
    description: "A form control for collecting single-line text input with support for various input types and validation",
    defaultProps: {
      label: "Label",
      placeholder: "Enter text...",
      type: "text",
      disabled: false,
    },
    propTypes: {
      label: { 
        type: "string",
        description: "The label text displayed above the input field"
      },
      placeholder: { 
        type: "string",
        description: "Placeholder text shown when input is empty"
      },
      type: { 
        type: "select", 
        options: ["text", "email", "password", "number"],
        description: "The input type which affects validation and keyboard"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the input is disabled and non-interactive"
      },
    },
  },
  render: TextInputRenderer,
  PropsPanel: TextInputPropsPanel,
  Documentation: TextInputDocumentation,
} 