"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { ChevronsUpDown, Check } from "lucide-react"
import { Label } from "@/components/ui/label"
import type { ComponentInstance } from '../types'

export function ComboboxRenderer(instance: ComponentInstance, isSelected: boolean, onClick: () => void) {
  const { props } = instance

  const baseClasses = `cursor-pointer transition-all ${
    isSelected ? "ring-2 ring-primary ring-offset-2" : "hover:ring-1 hover:ring-border"
  }`

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "option4", label: "Option 4" },
  ]

  return (
    <div key={instance.id} className={`${baseClasses} w-64 space-y-2 p-2 rounded`} onClick={onClick}>
      {props.label && (
        <Label>{String(props.label)}</Label>
      )}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
            disabled={Boolean(props.disabled)}
          >
            {String(props.placeholder || "Select option...")}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-0">
          <Command>
            <CommandInput 
              placeholder={String(props.searchPlaceholder || "Search...")} 
            />
            <CommandEmpty>No option found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem key={option.value} value={option.value}>
                  <Check className="mr-2 h-4 w-4 opacity-0" />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
} 