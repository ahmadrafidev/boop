import type { ComponentConfig } from '../types'
import { SliderRenderer } from './renderer'
import { SliderPropsPanel } from './props-panel'
import { SliderDocumentation } from './docs'

export const sliderConfig: ComponentConfig = {
  definition: {
    type: "Slider",
    name: "Slider",
    icon: "Sliders",
    description: "An interactive component for selecting a numeric value within a specified range with optional step intervals",
    defaultProps: {
      label: "Value",
      value: 50,
      min: 0,
      max: 100,
      step: 1,
      showValue: true,
      disabled: false,
    },
    propTypes: {
      label: { 
        type: "string",
        description: "The label text displayed above the slider"
      },
      value: { 
        type: "string",
        description: "The current value of the slider"
      },
      min: { 
        type: "string",
        description: "The minimum value of the slider range"
      },
      max: { 
        type: "string",
        description: "The maximum value of the slider range"
      },
      step: { 
        type: "string",
        description: "The step increment for slider values"
      },
      showValue: { 
        type: "boolean",
        description: "Whether to show the current value and range labels"
      },
      disabled: { 
        type: "boolean",
        description: "Whether the slider is disabled and non-interactive"
      },
    },
  },
  render: SliderRenderer,
  PropsPanel: SliderPropsPanel,
  Documentation: SliderDocumentation,
} 