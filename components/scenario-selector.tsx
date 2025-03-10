"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScenarioBuilderDialog } from "./scenario-builder/scenario-builder-dialog"
import { ChevronDown, BookOpen, Save, Upload } from "lucide-react"
import type { EVMScenario } from "@/types/scenarios"

// Update the builtInScenarios array to include category and author
const builtInScenarios: EVMScenario[] = [
  {
    name: "Simple Value Transfer",
    description: "Basic ETH transfer between two accounts",
    category: "basic",
    author: "EVM Visualizer Team",
    transaction: {
      from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      to: "0x1234567890123456789012345678901234567890",
      value: "0.1",
      gasLimit: 21000,
      gasPrice: 20,
      data: "0x",
      nonce: 5,
    },
    steps: [
      {
        description: "Transaction initiated",
        opcodes: [],
        stack: [],
        memory: "0x",
        storage: {},
      },
      // More steps would be defined here
    ],
  },
  {
    name: "ERC-20 Token Transfer",
    description: "Standard ERC-20 token transfer between accounts",
    category: "tokens",
    author: "EVM Visualizer Team",
    transaction: {
      from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      to: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC contract
      value: "0",
      gasLimit: 60000,
      gasPrice: 20,
      data: "0xa9059cbb000000000000000000000000abcdef1234567890abcdef1234567890abcdef00000000000000000000000000000000000000000000000000000000000000064", // transfer(address,uint256)
      nonce: 5,
    },
    steps: [
      {
        description: "Transaction initiated",
        opcodes: [],
        stack: [],
        memory: "0x",
        storage: {},
      },
      // More steps would be defined here
    ],
  },
]

interface ScenarioSelectorProps {
  onSelectScenario: (scenario: EVMScenario) => void
  currentScenario?: EVMScenario
}

export function ScenarioSelector({ onSelectScenario, currentScenario }: ScenarioSelectorProps) {
  const [customScenarios, setCustomScenarios] = useState<EVMScenario[]>([])

  const handleSaveScenario = (scenario: EVMScenario) => {
    // Add to custom scenarios
    setCustomScenarios((prev) => [...prev, scenario])

    // Select the new scenario
    onSelectScenario(scenario)
  }

  const exportScenario = () => {
    if (!currentScenario) return

    const dataStr = JSON.stringify(currentScenario, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`

    const exportFileDefaultName = `${currentScenario.name.replace(/\s+/g, "-").toLowerCase()}-scenario.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importScenario = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement
      if (!target.files?.length) return

      const file = target.files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        try {
          const scenario = JSON.parse(event.target?.result as string) as EVMScenario
          setCustomScenarios((prev) => [...prev, scenario])
          onSelectScenario(scenario)
        } catch (error) {
          console.error("Failed to parse scenario file:", error)
          // You could add a toast notification here
        }
      }

      reader.readAsText(file)
    }

    input.click()
  }

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <BookOpen className="mr-2 h-4 w-4" />
            {currentScenario?.name || "Select Scenario"}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        {/* Update the DropdownMenuContent to show categories and authors */}
        <DropdownMenuContent align="end" className="w-[240px]">
          <DropdownMenuLabel>Built-in Scenarios</DropdownMenuLabel>
          {builtInScenarios.map((scenario) => (
            <DropdownMenuItem key={scenario.name} onClick={() => onSelectScenario(scenario)}>
              <div className="flex flex-col">
                <span>{scenario.name}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {scenario.category && <span className="capitalize">{scenario.category}</span>}
                  {scenario.author && <span> • {scenario.author}</span>}
                </span>
              </div>
            </DropdownMenuItem>
          ))}

          {customScenarios.length > 0 && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Custom Scenarios</DropdownMenuLabel>
              {customScenarios.map((scenario, index) => (
                <DropdownMenuItem key={`custom-${index}`} onClick={() => onSelectScenario(scenario)}>
                  <div className="flex flex-col">
                    <span>{scenario.name}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {scenario.category && <span className="capitalize">{scenario.category}</span>}
                      {scenario.author && <span> • {scenario.author}</span>}
                    </span>
                  </div>
                </DropdownMenuItem>
              ))}
            </>
          )}

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={importScenario}>
            <Upload className="mr-2 h-4 w-4" />
            Import Scenario
          </DropdownMenuItem>

          {currentScenario && (
            <DropdownMenuItem onClick={exportScenario}>
              <Save className="mr-2 h-4 w-4" />
              Export Current Scenario
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <ScenarioBuilderDialog onSaveScenario={handleSaveScenario} />
    </div>
  )
}

