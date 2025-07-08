import type { ComponentConfig } from '../types'
import { TabsRenderer } from './renderer'
import { TabsPropsPanel } from './props-panel'
import { TabsDocumentation } from './docs'

export const tabsConfig: ComponentConfig = {
  definition: {
    type: "Tabs",
    name: "Tabs",
    icon: "Layout",
    description: "A navigation component that allows users to switch between different content panels or views",
    defaultProps: {
      defaultValue: "Tab 1",
      disabled: false,
    },
    propTypes: {
      defaultValue: { 
        type: "string",
        description: "The default active tab value"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the entire tabs component is disabled"
      },
    },
  },
  render: TabsRenderer,
  PropsPanel: TabsPropsPanel,
  Documentation: TabsDocumentation,
} 