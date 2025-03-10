"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Settings, Keyboard, Moon, Sun, ChevronDown, Info, ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { useState } from "react"

export function MainNav() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()
  const [selectedScenario, setSelectedScenario] = useState("Simple Value Transfer")
  const isVisualizer = pathname.includes("/visualizer")

  const scenarios = ["Simple Value Transfer", "Contract Creation", "Token Transfer", "NFT Minting"]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex items-center space-x-2 md:space-x-4">
          {pathname !== "/" && (
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
          )}
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block">EVM Visualizer</span>
          </Link>
        </div>

        {/* Show visualization controls only in visualizer */}
        {isVisualizer ? (
          <div className="flex flex-1 items-center justify-center space-x-2 md:space-x-4">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="min-w-[200px]">
                    {selectedScenario}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-[200px]">
                  {scenarios.map((scenario) => (
                    <DropdownMenuItem key={scenario} onClick={() => setSelectedScenario(scenario)}>
                      {scenario}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Create Custom Scenario
              </Button>

              <Button variant="outline" className="hidden lg:flex">
                <Keyboard className="mr-2 h-4 w-4" />
                Keyboard Shortcuts
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex-1" />
        )}

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <nav className="flex items-center space-x-2">
            <Link href="/about">
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
                <span className="sr-only">About</span>
              </Button>
            </Link>
            <Link href="/docs" target="_blank">
              <Button variant="ghost" size="icon">
                <Book className="h-4 w-4" />
                <span className="sr-only">Documentation</span>
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>
        </div>
      </div>

      {/* Visualization status bar - only shown in visualizer */}
      {isVisualizer && (
        <div className="container flex h-10 max-w-screen-2xl items-center border-t border-border/40">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Step: 0/10</span>
            <span className="text-sm text-muted-foreground">Ready to start execution</span>
          </div>
        </div>
      )}
    </header>
  )
}

