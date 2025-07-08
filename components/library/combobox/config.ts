import type { ComponentConfig } from '../types'
import { ComboboxRenderer } from './renderer'
import { ComboboxPropsPanel } from './props-panel'
import { ComboboxDocumentation } from './docs'

export const comboboxConfig: ComponentConfig = {
  definition: {
    type: "Combobox",
    name: "Combobox",
    icon: "ChevronDown",
    description: "A searchable dropdown component that allows users to select from a list of options or enter custom values",
    defaultProps: {
      placeholder: "Select option...",
      searchPlaceholder: "Search...",
      disabled: false,
    },
    propTypes: {
      placeholder: { 
        type: "string",
        description: "Placeholder text shown when no option is selected"
      },
      searchPlaceholder: { 
        type: "string",
        description: "Placeholder text for the search input"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the combobox is disabled and non-interactive"
      },
    },
  },
  render: ComboboxRenderer,
  PropsPanel: ComboboxPropsPanel,
  Documentation: ComboboxDocumentation,
} 