"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Component, Layout, PanelLeft, PanelRight, Moon, Sun, Monitor, Check } from "lucide-react"
import { useTheme } from "next-themes"
import { useIsMobile } from "@/hooks/use-mobile"
import type { ComponentDefinition } from "@/app/page"

interface TopNavigationProps {
  activeView: "component" | "canvas"
  onViewChange: (view: "component" | "canvas") => void
  selectedComponent: ComponentDefinition | null
  leftPanelOpen: boolean
  rightPanelOpen: boolean
  onToggleLeftPanel: () => void
  onToggleRightPanel: () => void
}

export function TopNavigation({
  activeView,
  onViewChange,
  selectedComponent,
  leftPanelOpen,
  rightPanelOpen,
  onToggleLeftPanel,
  onToggleRightPanel,
}: TopNavigationProps) {
  const { theme, setTheme } = useTheme()
  const isMobile = useIsMobile()

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />
      case "dark":
        return <Moon className="h-4 w-4" />
      case "system":
        return <Monitor className="h-4 w-4" />
      default:
        return <Monitor className="h-4 w-4" />
    }
  }

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ]

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left Side */}
      <div className="flex items-center space-x-4 min-w-0 flex-1">
        {/* Left Panel Toggle */}
        {!isMobile && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleLeftPanel} 
            className={leftPanelOpen ? "bg-accent" : ""}
            aria-label="Toggle left panel"
          >
            <PanelLeft className="w-4 h-4" />
          </Button>
        )}

        {/* Component Name or Current View */}
        <div className="min-w-0 flex-1">
          {activeView === "component" && selectedComponent ? (
            <h1 className="text-sm md:text-xl font-bold">{selectedComponent.name}</h1>
          ) : activeView === "canvas" ? (
            <h1 className="text-sm md:text-xl font-bold">Canvas</h1>
          ) : (
            <h1 className="text-sm md:text-xl font-bold">Boop</h1>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center space-x-2 md:space-x-4">
        {/* View Tabs */}
        <Tabs value={activeView} onValueChange={(value) => onViewChange(value as "component" | "canvas")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="component" className="flex items-center gap-2 text-xs md:text-sm">
              <Component className="w-4 h-4" />
              <span className="hidden sm:inline">Component</span>
            </TabsTrigger>
            <TabsTrigger value="canvas" className="flex items-center gap-2 text-xs md:text-sm">
              <Layout className="w-4 h-4" />
              <span className="hidden sm:inline">Canvas</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Right Panel Toggle */}
        {!isMobile && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleRightPanel}
            className={rightPanelOpen ? "bg-accent" : ""}
            aria-label="Toggle right panel"
          >
            <PanelRight className="w-4 h-4" />
          </Button>
        )}

        {/* Theme Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {themeOptions.map((option) => {
              const IconComponent = option.icon
              const isSelected = theme === option.value
              return (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                  {isSelected && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
