import type { ComponentConfig } from '../types'
import { AvatarRenderer } from './renderer'
import { AvatarPropsPanel } from './props-panel'
import { AvatarDocumentation } from './docs'

export const avatarConfig: ComponentConfig = {
  definition: {
    type: "Avatar",
    name: "Avatar",
    icon: "User",
    description: "A circular component for displaying user profile images with fallback support for initials when no image is available",
    defaultProps: {
      src: "",
      fallback: "JD",
      size: "default",
    },
    propTypes: {
      src: { 
        type: "string",
        description: "The URL of the image to display"
      },
      fallback: { 
        type: "string",
        description: "Fallback text (initials) when image is not available"
      },
      size: { 
        type: "select", 
        options: ["sm", "default", "lg"],
        description: "The size of the avatar"
      },
    },
  },
  render: AvatarRenderer,
  PropsPanel: AvatarPropsPanel,
  Documentation: AvatarDocumentation,
} 