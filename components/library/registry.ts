import type { ComponentConfig, ComponentDefinition, ComponentPropsPanelProps, ComponentInstance } from './types'
import type React from 'react'

import { alertConfig } from './alert'
import { avatarConfig } from './avatar'
import { badgeConfig } from './badge'
import { buttonConfig } from './button'
import { cardConfig } from './card'
import { checkboxConfig } from './checkbox'
import { comboboxConfig } from './combobox'
import { menuConfig } from './menu'
import { modalConfig } from './modal'
import { progressConfig } from './progress'
import { radioButtonConfig } from './radio-button'
import { sliderConfig } from './slider'
import { switchConfig } from './switch'
import { tabsConfig } from './tabs'
import { textConfig } from './text'
import { textInputConfig } from './text-input'
import { tooltipConfig } from './tooltip'

const COMPONENT_REGISTRY: Record<string, ComponentConfig> = {
  Alert: alertConfig,
  Avatar: avatarConfig,
  Badge: badgeConfig,
  Button: buttonConfig,
  Card: cardConfig,
  Checkbox: checkboxConfig,
  Combobox: comboboxConfig,
  Menu: menuConfig,
  Modal: modalConfig,
  Progress: progressConfig,
  RadioButton: radioButtonConfig,
  Slider: sliderConfig,
  Switch: switchConfig,
  Tabs: tabsConfig,
  Text: textConfig,
  TextInput: textInputConfig,
  Tooltip: tooltipConfig,
}

export function getAllComponentDefinitions(): ComponentDefinition[] {
  return Object.values(COMPONENT_REGISTRY).map(config => config.definition)
}

export function getComponentConfig(type: string): ComponentConfig | undefined {
  return COMPONENT_REGISTRY[type]
}

export function getComponentRenderer(type: string): ((instance: ComponentInstance, isSelected: boolean, onClick: () => void) => React.ReactElement) | undefined {
  const config = COMPONENT_REGISTRY[type]
  return config?.render
}

export function getComponentPropsPanel(type: string): React.ComponentType<ComponentPropsPanelProps> | undefined {
  const config = COMPONENT_REGISTRY[type]
  return config?.PropsPanel
}

export function getComponentDocumentation(type: string): React.ComponentType | undefined {
  const config = COMPONENT_REGISTRY[type]
  return config?.Documentation
}

export function isComponentRegistered(type: string): boolean {
  return COMPONENT_REGISTRY.hasOwnProperty(type)
}

export function getRegisteredComponentTypes(): string[] {
  return Object.keys(COMPONENT_REGISTRY)
} 