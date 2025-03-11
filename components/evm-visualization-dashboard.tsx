"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
  Info,
  Code,
  Database,
  Layers,
  HardDrive,
  Cpu,
  Hash,
  FileCode,
  PanelRight,
  PanelRightClose,
  Settings,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EVMCanvas } from "@/components/evm-canvas"
import { TransactionDetails } from "@/components/transaction-details"
import { StackDetails } from "@/components/stack-details"
import { MemoryDetails } from "@/components/memory-details"
import { StorageDetails } from "@/components/storage-details"
import { WorldStateDetails } from "@/components/world-state-details"
import { ExecutionDetails } from "@/components/execution-details"
import { useEVMSimulation } from "@/hooks/use-evm-simulation"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ScrollableTabs } from "@/components/scrollable-tabs"
import { TutorialOverlay } from "@/components/tutorial-overlay"
import { BytecodeExplorer } from "@/components/bytecode-explorer"
import { TransactionLoader } from "@/components/transaction-loader"
import { ExecutionSpeedControl } from "@/components/execution-speed-control"
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts"
import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { GasProfiler } from "@/components/gas-profiler"
import { CallStackVisualization } from "@/components/call-stack-visualization"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ScenarioSelector } from "@/components/scenario-selector"

export default function EVMVisualizationDashboard() { 
  const [activeTab, setActiveTab] = useState("transaction")
  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [executionSpeed, setExecutionSpeed] = useState(1000) // Default 1 second

  const {
    currentStep,
    totalSteps,
    isRunning,
    transaction,
    stack,
    memory,
    storage,
    worldState,
    currentOpcode,
    gasUsed,
    gasRemaining,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    stepForward,
    stepBackward,
    setTransaction,
    setExecutionInterval,
    loadScenario,
    currentScenario,
  } = useEVMSimulation()

  // Sample call stack data (in a real app, this would come from the simulation)
  const sampleCallStack = [
    {
      type: "CALL" as const,
      from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      to: "0x1234567890123456789012345678901234567890",
      value: "0.1",
      gasLimit: 21000,
      depth: 0,
    },
  ]

  // Sample opcode gas costs (in a real app, this would be calculated from execution)
  const sampleOpcodeGasCosts = [
    { opcode: "PUSH1", gas: 3 },
    { opcode: "MSTORE", gas: 3 },
    { opcode: "CALLVALUE", gas: 2 },
    { opcode: "JUMPI", gas: 10 },
    { opcode: "SSTORE", gas: 20000 },
  ]

  // Handle play/pause toggle
  const togglePlayPause = () => {
    if (isRunning) {
      pauseSimulation()
    } else {
      startSimulation()
    }
  }

  // Set up keyboard shortcuts
  useKeyboardShortcuts({
    onStepForward: stepForward,
    onStepBackward: stepBackward,
    onPlayPause: togglePlayPause,
    onReset: resetSimulation,
  })

  // Update execution speed when changed
  useEffect(() => {
    setExecutionInterval(executionSpeed)
  }, [executionSpeed, setExecutionInterval])

  // Function to display step description
  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return "Ready to start execution"
      case 1:
        return "Transaction initiated, pushing value to stack"
      case 2:
        return "Second value pushed to stack"
      case 3:
        return "Storing value from stack to memory"
      case 4:
        return "Reading transaction value"
      case 5:
        return "Conditional check on stack"
      case 6:
        return "Storing value to persistent storage"
      case 7:
        return "Updating world state with new values"
      case 8:
        return "Additional storage update"
      case 9:
        return "Finalizing transaction, transferring value"
      case 10:
        return "Transaction completed, state committed"
      default:
        return "Unknown step"
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Tutorial Overlay */}
      <TutorialOverlay />

      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h1 className="text-xl font-bold">EVM Visualizer</h1>
          </div>

          {/* Step Badge - Always visible */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
            >
              Step: {currentStep}/{totalSteps}
            </Badge>

            {/* Essential Controls - Always visible */}
            <KeyboardShortcutsDialog />
            <ThemeToggle />

            {/* Mobile Menu for Additional Controls */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="md:hidden">
                  <Settings className="h-4 w-4" />
                  <span className="sr-only">More Options</span>
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>EVM Visualizer Options</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-4">
                  <div className="grid gap-4">
                    <Button variant="outline" size="sm" className="justify-start">
                      <Info className="h-4 w-4 mr-2" />
                      About
                    </Button>
                    <Button variant="outline" size="sm" className="justify-start">
                      <Code className="h-4 w-4 mr-2" />
                      Examples
                    </Button>
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">Transaction Settings</h3>
                      <TransactionLoader onLoadTransaction={setTransaction} />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Desktop Controls - Hidden on Mobile */}
            <div className="hidden md:flex items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Settings</SheetTitle>
                    <SheetDescription>Configure the EVM visualization</SheetDescription>
                  </SheetHeader>
                  <div className="py-4 space-y-4">
                    <TransactionLoader onLoadTransaction={setTransaction} />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Add the ScenarioSelector here */}
              <ScenarioSelector onSelectScenario={loadScenario} currentScenario={currentScenario} />

              <Button variant="outline" size="sm">
                <Info className="h-4 w-4 mr-2" />
                About
              </Button>

              <Button variant="outline" size="sm">
                <Code className="h-4 w-4 mr-2" />
                Examples
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Current Step Description */}
      <div className="bg-slate-100 dark:bg-slate-900 py-2 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto">
          <div className="text-sm font-medium text-slate-700 dark:text-slate-300">{getStepDescription()}</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Main Canvas */}
        <div className={cn("flex-1 overflow-hidden transition-all duration-300", isPanelOpen ? "mr-0" : "mr-0")}>
          <EVMCanvas
            transaction={transaction}
            stack={stack}
            memory={memory}
            storage={storage}
            worldState={worldState}
            currentStep={currentStep}
            currentOpcode={currentOpcode}
            gasUsed={gasUsed}
            gasRemaining={gasRemaining}
          />
        </div>

        {/* Toggle Panel Button */}
        <div className="flex items-center border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className="h-full rounded-none"
          >
            {isPanelOpen ? (
              <PanelRightClose className="h-5 w-5 text-slate-500" />
            ) : (
              <PanelRight className="h-5 w-5 text-slate-500" />
            )}
          </Button>
        </div>

        {/* Right Panel - Collapsible */}
        <div
          className={cn(
            "border-l border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-y-auto transition-all duration-300 ease-in-out",
            isPanelOpen ? "w-96 opacity-100" : "w-0 opacity-0 overflow-hidden",
          )}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-slate-200 dark:border-slate-800">
              <ScrollableTabs>
                <TabsList className="justify-start rounded-none border-b-0 bg-transparent p-0">
                  <TabsTrigger
                    value="transaction"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Transaction
                  </TabsTrigger>
                  <TabsTrigger
                    value="stack"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <Layers className="h-4 w-4 mr-2" />
                    Stack
                  </TabsTrigger>
                  <TabsTrigger
                    value="memory"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <HardDrive className="h-4 w-4 mr-2" />
                    Memory
                  </TabsTrigger>
                  <TabsTrigger
                    value="storage"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <Database className="h-4 w-4 mr-2" />
                    Storage
                  </TabsTrigger>
                  <TabsTrigger
                    value="worldState"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <Hash className="h-4 w-4 mr-2" />
                    World State
                  </TabsTrigger>
                  <TabsTrigger
                    value="execution"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <FileCode className="h-4 w-4 mr-2" />
                    Execution
                  </TabsTrigger>
                  <TabsTrigger
                    value="bytecode"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    Bytecode
                  </TabsTrigger>
                  <TabsTrigger
                    value="advanced"
                    className="rounded-none border-b-2 border-transparent px-4 py-3 data-[state=active]:border-purple-600 data-[state=active]:bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Advanced
                  </TabsTrigger>
                </TabsList>
              </ScrollableTabs>
            </div>
            <TabsContent value="transaction" className="p-4">
              <TransactionDetails transaction={transaction} />
            </TabsContent>
            <TabsContent value="stack" className="p-4">
              <StackDetails stack={stack} />
            </TabsContent>
            <TabsContent value="memory" className="p-4">
              <MemoryDetails memory={memory} />
            </TabsContent>
            <TabsContent value="storage" className="p-4">
              <StorageDetails storage={storage} />
            </TabsContent>
            <TabsContent value="worldState" className="p-4">
              <WorldStateDetails worldState={worldState} />
            </TabsContent>
            <TabsContent value="execution" className="p-4">
              <ExecutionDetails currentOpcode={currentOpcode} gasUsed={gasUsed} gasRemaining={gasRemaining} />
            </TabsContent>
            <TabsContent value="bytecode" className="p-4">
              <BytecodeExplorer bytecode={transaction.data} currentOpcode={currentOpcode} currentStep={currentStep} />
            </TabsContent>
            <TabsContent value="advanced" className="p-4">
              <div className="space-y-4">
                <GasProfiler gasUsed={gasUsed} gasLimit={transaction.gasLimit} opcodeGasCosts={sampleOpcodeGasCosts} />
                <CallStackVisualization callStack={sampleCallStack} currentDepth={0} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Control Panel */}
      <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4">
        <div className="container mx-auto">
          <Card className="border-slate-200 dark:border-slate-800">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={resetSimulation}>
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={stepBackward} disabled={currentStep === 0}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {isRunning ? (
                      <Button variant="outline" size="icon" onClick={pauseSimulation}>
                        <Pause className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={startSimulation}
                        disabled={currentStep === totalSteps}
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="icon" onClick={stepForward} disabled={currentStep === totalSteps}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Opcode: <span className="font-mono">{currentOpcode || "N/A"}</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Gas Used: <span className="font-mono">{gasUsed}</span>
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      Gas Remaining: <span className="font-mono">{gasRemaining}</span>
                    </div>
                  </div>
                </div>

                {/* Execution Speed Control */}
                <ExecutionSpeedControl onSpeedChange={setExecutionSpeed} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

