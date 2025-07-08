"use client"

import type { ComponentDefinition, ComponentInstance, ComponentProps } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"

interface CodePanelProps {
  component: ComponentDefinition | null
  instance: ComponentInstance | null
  isCollapsed: boolean
  onToggleCollapse: () => void
  previewProps?: ComponentProps
}

export function CodePanel({ component, instance, isCollapsed, onToggleCollapse, previewProps }: CodePanelProps) {
  const [copied, setCopied] = useState(false)
  const [contentHeight, setContentHeight] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const generateCode = () => {
    if (!component) return ""
    
    const props = instance?.props || previewProps || component.defaultProps

    const allProps = Object.entries(props).filter(([, value]) => {
      return value !== undefined && value !== null && value !== ""
    })

    const propStrings = allProps.map(([propKey, value]) => {
      if (propKey === "children" && typeof value === "string") {
        return null 
      }
      
      if (typeof value === "boolean") {
        return value ? propKey : `${propKey}={false}`
      }
      
      if (typeof value === "string") {
        return `${propKey}="${value}"`
      }
      
      return `${propKey}={${JSON.stringify(value)}}`
    }).filter(Boolean)

    const hasChildren = props.children && typeof props.children === "string"
    
    if (hasChildren) {
      const propsString = propStrings.length > 0 ? `\n  ${propStrings.join("\n  ")}\n` : ""
      return `<${component.type}${propsString}>\n  ${props.children}\n</${component.type}>`
    } else {
      if (propStrings.length > 2) {
        const propsString = `\n  ${propStrings.join("\n  ")}\n`
        return `<${component.type}${propsString}/>`
      } else {
        const propsString = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : ""
        return `<${component.type}${propsString} />`
      }
    }
  }

  const code = generateCode()
  const lines = code.split("\n")

  // Calculate dynamic height based on content
  useEffect(() => {
    if (contentRef.current && !isCollapsed && component) {
      const lineHeight = 20 // 1.25rem in pixels (leading-5)
      const padding = 32 // 2rem total padding (p-4 = 1rem each side)
      const baseHeight = lines.length * lineHeight + padding
      
      // Dynamic height constraints with responsive considerations
      const isMobile = window.innerWidth < 768
      const minHeight = Math.max(isMobile ? 60 : 80, baseHeight) // Smaller min height on mobile
      const maxHeight = Math.min(
        isMobile ? 200 : 320, // Smaller max height on mobile
        window.innerHeight * (isMobile ? 0.25 : 0.3) // Less viewport usage on mobile
      )
      
      const finalHeight = Math.min(maxHeight, minHeight)
      setContentHeight(finalHeight)
      setIsScrollable(baseHeight > finalHeight)
    }
  }, [lines.length, isCollapsed, code, component])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current && !isCollapsed && component) {
        const lineHeight = 20
        const padding = 32
        const baseHeight = lines.length * lineHeight + padding
        
        const isMobile = window.innerWidth < 768
        const minHeight = Math.max(isMobile ? 60 : 80, baseHeight)
        const maxHeight = Math.min(
          isMobile ? 200 : 320,
          window.innerHeight * (isMobile ? 0.25 : 0.3)
        )
        
        const finalHeight = Math.min(maxHeight, minHeight)
        setContentHeight(finalHeight)
        setIsScrollable(baseHeight > finalHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [lines.length, isCollapsed, component])

  // Early return after all hooks
  if (!component) return null

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      toast.success("Code copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
      toast.error("Failed to copy code")
    }
  }

  const highlightSyntax = (line: string) => {
    if (line.trim() === "") return <span>&nbsp;</span>

    // Handle opening tag
    if (line.includes("<") && !line.includes("</")) {
      const parts = line.split(/(<\w+|\/?>|\w+="[^"]*"|\w+={[^}]*}|\w+(?=\s|>))/g)
      return (
        <span>
          {parts.map((part, index) => {
            if (part.startsWith("<")) {
              return <span key={index} className="text-blue-600 dark:text-blue-400">{part}</span>
            }
            if (part === "/>" || part === ">") {
              return <span key={index} className="text-blue-600 dark:text-blue-400">{part}</span>
            }
            if (part.includes('="')) {
              const [attr, value] = part.split('="')
              return (
                <span key={index}>
                  <span className="text-purple-600 dark:text-purple-400">{attr}</span>
                  <span>=</span>
                  <span className="text-green-600 dark:text-green-400">&quot;{value}</span>
                </span>
              )
            }
            if (part.includes("={")) {
              const [attr, value] = part.split("={")
              return (
                <span key={index}>
                  <span className="text-purple-600 dark:text-purple-400">{attr}</span>
                  <span>=</span>
                  <span className="text-orange-600 dark:text-orange-400">{"{"}{value}</span>
                </span>
              )
            }
            if (part.match(/^\w+$/)) {
              return <span key={index} className="text-purple-600 dark:text-purple-400">{part}</span>
            }
            return <span key={index}>{part}</span>
          })}
        </span>
      )
    }

    // Handle closing tag
    if (line.includes("</")) {
      return (
        <span>
          <span className="text-blue-600 dark:text-blue-400">{"</"}</span>
          <span className="text-red-600 dark:text-red-400">{component.type}</span>
          <span className="text-blue-600 dark:text-blue-400">{">"}</span>
        </span>
      )
    }

    // Handle content
    return <span className="text-gray-800 dark:text-gray-200">{line}</span>
  }

  if (isCollapsed) {
    return (
      <div className="border-t bg-background">
        <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">Code</h3>
            <span className="text-xs text-muted-foreground">
              {lines.length} line{lines.length !== 1 ? 's' : ''}
            </span>
            {isScrollable && !isCollapsed && (
              <span className="text-xs text-amber-600 dark:text-amber-400">
                • Scrollable
              </span>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={onToggleCollapse}>
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t bg-background">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50 transition-all duration-300 ease-in-out">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium">Code</h3>
          <span className="text-xs text-muted-foreground">
            {lines.length} line{lines.length !== 1 ? 's' : ''}
          </span>
          {isScrollable && !isCollapsed && (
            <span className="text-xs text-amber-600 dark:text-amber-400">
              • Scrollable
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              disabled={copied}
              className="transition-all duration-300 ease-in-out opacity-100"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onToggleCollapse} className="transition-all duration-200 ease-in-out">
            {isCollapsed ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      <div 
        ref={contentRef}
        className={`relative transition-all duration-400 ease-in-out overflow-hidden ${
          isCollapsed 
            ? 'h-0 opacity-0 transform translate-y-[-10px]' 
            : 'opacity-100 transform translate-y-0'
        }`}
        style={{ 
          height: isCollapsed ? '0px' : `${contentHeight}px`
        }}
      >
        <div className={`h-full p-4 font-mono text-sm bg-muted/30 overflow-x-auto overflow-y-auto transition-all duration-300 ease-in-out ${isScrollable ? 'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border' : ''}`}>
          <div className="flex h-full">
            <div className="text-muted-foreground pr-4 select-none text-right min-w-[2rem] flex-shrink-0">
              {lines.map((_, index) => (
                <div key={index} className="leading-5 transition-opacity duration-300 ease-in-out">
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              {lines.map((line, index) => (
                <div key={index} className="whitespace-pre leading-5 transition-opacity duration-300 ease-in-out">
                  {highlightSyntax(line)}
                </div>
              ))}
            </div>
          </div>
          {/* Scroll fade indicator */}
          {isScrollable && (
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-muted/30 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    </div>
  )
}

CodePanel.displayName = "CodePanel"
