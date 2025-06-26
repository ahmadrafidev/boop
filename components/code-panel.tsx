"use client"

import type { ComponentDefinition, ComponentInstance } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface CodePanelProps {
  component: ComponentDefinition | null
  instance: ComponentInstance | null
  isCollapsed: boolean
  onToggleCollapse: () => void
  previewProps?: Record<string, any>
}

export function CodePanel({ component, instance, isCollapsed, onToggleCollapse, previewProps }: CodePanelProps) {
  const [copied, setCopied] = useState(false)

  if (!component) return null

  const props = instance?.props || previewProps || component.defaultProps

  const generateCode = () => {
    const allProps = Object.entries(props).filter(([key, value]) => {
      return value !== undefined && value !== null && value !== ""
    })

    const propStrings = allProps.map(([key, value]) => {
      if (key === "children" && typeof value === "string") {
        return null 
      }
      
      if (typeof value === "boolean") {
        return value ? key : `${key}={false}`
      }
      
      if (typeof value === "string") {
        return `${key}="${value}"`
      }
      
      return `${key}={${JSON.stringify(value)}}`
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

  const highlightSyntax = (line: string, lineNumber: number) => {
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
                  <span className="text-green-600 dark:text-green-400">"{value}</span>
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
          <h3 className="text-sm font-medium">Code</h3>
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
        <h3 className="text-sm font-medium">Code</h3>
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
        className={`transition-all duration-400 ease-in-out overflow-hidden ${
          isCollapsed 
            ? 'h-0 opacity-0 transform translate-y-[-10px]' 
            : 'h-20 opacity-100 transform translate-y-0'
        }`}
      >
        <div className="h-full p-4 font-mono text-sm bg-muted/30 overflow-x-auto overflow-y-auto transition-all duration-300 ease-in-out">
          <div className="flex h-full">
            <div className="text-muted-foreground pr-4 select-none text-right min-w-[2rem]">
              {lines.map((_, index) => (
                <div key={index} className="leading-5 transition-opacity duration-300 ease-in-out">
                  {index + 1}
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              {lines.map((line, index) => (
                <div key={index} className="whitespace-pre leading-5 transition-opacity duration-300 ease-in-out">
                  {highlightSyntax(line, index)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
