"use client"

import type { ComponentDefinition, ComponentInstance } from "@/app/page"
import { Button } from "@/components/ui/button"
import { Copy, Check, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface CodePanelProps {
  component: ComponentDefinition | null
  instance: ComponentInstance | null
}

export function CodePanel({ component, instance }: CodePanelProps) {
  const [copied, setCopied] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  if (!component) return null

  const props = instance?.props || component.defaultProps

  const generateCode = () => {
    const filteredProps = Object.entries(props).filter(([key, value]) => {
      // Include if it's different from default or if it's children
      return value !== component.defaultProps[key] || key === "children"
    })

    if (filteredProps.length === 0) {
      return `<${component.type} />`
    }

    const propStrings = filteredProps.map(([key, value]) => {
      if (key === "children" && typeof value === "string") {
        return null // Handle children separately
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
      const propsString = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : ""
      return `<${component.type}${propsString}>\n  ${props.children}\n</${component.type}>`
    } else {
      const propsString = propStrings.length > 0 ? ` ${propStrings.join(" ")}` : ""
      return `<${component.type}${propsString} />`
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
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(false)}>
            <ChevronUp className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="border-t bg-background">
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/50">
        <h3 className="text-sm font-medium">Code</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={copyToClipboard} disabled={copied}>
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(true)}>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="p-4 font-mono text-sm bg-muted/30 overflow-x-auto max-h-48 overflow-y-auto">
        <div className="flex">
          <div className="text-muted-foreground pr-4 select-none text-right min-w-[2rem]">
            {lines.map((_, index) => (
              <div key={index} className="leading-5">{index + 1}</div>
            ))}
          </div>
          <div className="flex-1 min-w-0">
            {lines.map((line, index) => (
              <div key={index} className="whitespace-pre leading-5">
                {highlightSyntax(line, index)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
