"use client"

import React, { useCallback, useState } from "react"
import ReactFlow, {
  Background,
  Controls,
  type Node,
  type Edge,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Panel,
} from "reactflow"
import "reactflow/dist/style.css"
import type { EVMTransaction, EVMStack, EVMMemory, EVMStorage, EVMWorldState } from "@/types/evm"
import { StackNode } from "./custom-nodes/stack-node"
import { MemoryNode } from "./custom-nodes/memory-node"
import { StorageNode } from "./custom-nodes/storage-node"
import { TransactionNode } from "./custom-nodes/transaction-node"
import { WorldStateNode } from "./custom-nodes/world-state-node"
import { OpcodeNode } from "./custom-nodes/opcode-node"
import { ProgramCounterNode } from "./custom-nodes/program-counter-node"
import { Button } from "@/components/ui/button"
import { ZoomIn } from "lucide-react"
import { NodeInfoModal } from "./ui/node-info-modal"
import { TransactionDetails } from "./transaction-details"
import { StackDetails } from "./stack-details"
import { MemoryDetails } from "./memory-details"
import { StorageDetails } from "./storage-details"
import { WorldStateDetails } from "./world-state-details"
import { ExecutionDetails } from "./execution-details"

interface EVMCanvasProps {
  transaction: EVMTransaction
  stack: EVMStack
  memory: EVMMemory
  storage: EVMStorage
  worldState: EVMWorldState
  currentStep: number
  currentOpcode: string
  gasUsed: number
  gasRemaining: number
}

// Define custom node types
const nodeTypes = {
  transaction: TransactionNode,
  stack: StackNode,
  memory: MemoryNode,
  storage: StorageNode,
  worldState: WorldStateNode,
  opcode: OpcodeNode,
  programCounter: ProgramCounterNode,
}

export function EVMCanvas({
  transaction,
  stack,
  memory,
  storage,
  worldState,
  currentStep,
  currentOpcode,
  gasUsed,
  gasRemaining,
}: EVMCanvasProps) {
  // State for node info modal
  const [modalInfo, setModalInfo] = useState<{
    isOpen: boolean
    title: string
    description: string
    content: React.ReactNode
  }>({
    isOpen: false,
    title: "",
    description: "",
    content: null,
  })

  // Create initial nodes with more spacing
  const initialNodes: Node[] = [
    // Transaction and World State (top level)
    {
      id: "transaction",
      type: "transaction",
      data: {
        transaction,
        isActive: currentStep > 0,
        onClick: () => handleNodeClick("transaction"),
      },
      position: { x: 100, y: 50 },
      sourcePosition: Position.Bottom,
      draggable: true,
    },
    {
      id: "worldState",
      type: "worldState",
      data: {
        worldState,
        isActive: currentStep > 7,
        onClick: () => handleNodeClick("worldState"),
      },
      position: { x: 700, y: 50 },
      targetPosition: Position.Left,
      sourcePosition: Position.Bottom,
      draggable: true,
    },

    // EVM Execution Components (middle level)
    {
      id: "opcode",
      type: "opcode",
      data: {
        opcode: currentOpcode,
        gasCost: currentStep > 0 ? 3 : 0,
        step: currentStep,
        isActive: currentStep > 0 && currentStep <= 6,
        onClick: () => handleNodeClick("opcode"),
      },
      position: { x: 400, y: 250 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      draggable: true,
    },
    {
      id: "programCounter",
      type: "programCounter",
      data: {
        pc: currentStep > 0 ? currentStep * 2 : 0,
        step: currentStep,
        isActive: currentStep > 1,
        onClick: () => handleNodeClick("programCounter"),
      },
      position: { x: 700, y: 250 },
      targetPosition: Position.Top,
      sourcePosition: Position.Bottom,
      draggable: true,
    },

    // EVM State Components (bottom level)
    {
      id: "stack",
      type: "stack",
      data: {
        stack,
        step: currentStep,
        isActive: currentStep >= 1 && currentStep <= 5,
        onClick: () => handleNodeClick("stack"),
      },
      position: { x: 100, y: 450 },
      targetPosition: Position.Top,
      sourcePosition: Position.Right,
      draggable: true,
    },
    {
      id: "memory",
      type: "memory",
      data: {
        memory,
        step: currentStep,
        isActive: currentStep >= 3 && currentStep <= 4,
        onClick: () => handleNodeClick("memory"),
      },
      position: { x: 400, y: 450 },
      targetPosition: Position.Top,
      sourcePosition: Position.Right,
      draggable: true,
    },
    {
      id: "storage",
      type: "storage",
      data: {
        storage,
        step: currentStep,
        isActive: currentStep >= 6 && currentStep <= 8,
        onClick: () => handleNodeClick("storage"),
      },
      position: { x: 700, y: 450 },
      targetPosition: Position.Top,
      sourcePosition: Position.Left,
      draggable: true,
    },
  ]

  // Create initial edges with more descriptive labels
  const initialEdges: Edge[] = [
    // Transaction to World State
    {
      id: "transaction-worldState",
      source: "transaction",
      target: "worldState",
      animated: currentStep > 0 && currentStep <= 10,
      style: { stroke: "#9333ea", strokeWidth: 2 },
      label: "Updates state after execution",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#9333ea",
      },
    },

    // Transaction to Execution
    {
      id: "transaction-opcode",
      source: "transaction",
      target: "opcode",
      animated: currentStep > 0 && currentStep <= 2,
      style: { stroke: "#9333ea", strokeWidth: 2 },
      label: "Initiates bytecode execution",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#9333ea",
      },
    },

    // Execution connections
    {
      id: "opcode-programCounter",
      source: "opcode",
      target: "programCounter",
      animated: currentStep > 1 && currentStep <= 3,
      style: { stroke: "#0ea5e9", strokeWidth: 2 },
      label: "Advances PC after execution",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#0ea5e9",
      },
    },

    // Execution to State components
    {
      id: "opcode-stack",
      source: "opcode",
      target: "stack",
      animated: currentStep > 1 && currentStep <= 3,
      style: { stroke: "#3b82f6", strokeWidth: 2 },
      label: "Pushes/pops values",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
    },
    {
      id: "opcode-memory",
      source: "opcode",
      target: "memory",
      animated: currentStep > 2 && currentStep <= 4,
      style: { stroke: "#22c55e", strokeWidth: 2 },
      label: "Reads/writes temporary data",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#22c55e",
      },
    },
    {
      id: "opcode-storage",
      source: "opcode",
      target: "storage",
      animated: currentStep > 3 && currentStep <= 6,
      style: { stroke: "#f59e0b", strokeWidth: 2 },
      label: "Persists contract state",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#f59e0b",
      },
    },

    // State updates to World State
    {
      id: "storage-worldState",
      source: "storage",
      target: "worldState",
      animated: currentStep > 6 && currentStep <= 8,
      style: { stroke: "#f59e0b", strokeWidth: 2 },
      label: "Commits state changes",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#f59e0b",
      },
    },

    // Stack to Memory
    {
      id: "stack-memory",
      source: "stack",
      target: "memory",
      animated: currentStep > 2 && currentStep <= 4,
      style: { stroke: "#3b82f6", strokeWidth: 2, opacity: 0.7 },
      label: "Provides memory addresses",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#3b82f6",
      },
    },

    // Memory to Storage
    {
      id: "memory-storage",
      source: "memory",
      target: "storage",
      animated: currentStep > 4 && currentStep <= 6,
      style: { stroke: "#22c55e", strokeWidth: 2, opacity: 0.7 },
      label: "Provides data to store",
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: "#f8fafc", color: "#1e293b", fillOpacity: 0.8 },
      labelStyle: { fill: "#1e293b", fontWeight: 500 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "#22c55e",
      },
    },
  ]

  // Use React Flow hooks to manage nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const [reactFlowInstance, setReactFlowInstance] = useState(null)

  // Handle node click to show detailed information
  const handleNodeClick = (nodeId: string) => {
    let title = ""
    let description = ""
    let content: React.ReactNode = null

    switch (nodeId) {
      case "transaction":
        title = "Transaction"
        description = "Ethereum transactions initiate state changes in the blockchain"
        content = <TransactionDetails transaction={transaction} />
        break
      case "stack":
        title = "Stack"
        description = "Last-in, first-out data structure for EVM operations"
        content = <StackDetails stack={stack} />
        break
      case "memory":
        title = "Memory"
        description = "Temporary byte-addressable memory for the current execution"
        content = <MemoryDetails memory={memory} />
        break
      case "storage":
        title = "Storage"
        description = "Persistent key-value store for contract state"
        content = <StorageDetails storage={storage} />
        break
      case "worldState":
        title = "World State"
        description = "Global state of all accounts and contracts on the blockchain"
        content = <WorldStateDetails worldState={worldState} />
        break
      case "opcode":
        title = "Opcode Execution"
        description = "Current instruction being executed by the EVM"
        content = <ExecutionDetails currentOpcode={currentOpcode} gasUsed={gasUsed} gasRemaining={gasRemaining} />
        break
      case "programCounter":
        title = "Program Counter"
        description = "Points to the current instruction in the bytecode"
        content = (
          <div className="space-y-4">
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
              <h3 className="text-lg font-medium mb-2">Program Counter (PC)</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                The Program Counter is a special register that keeps track of
                which instruction in the bytecode is being executed next.
                It&apos;s incremented after each instruction unless a jump
                instruction is executed.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-md">
                  <div className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
                    Current Position
                  </div>
                  <div className="text-xl font-mono mt-1">
                    0x{(currentStep * 2).toString(16).padStart(4, "0")}
                  </div>
                </div>
                <div className="bg-cyan-50 dark:bg-cyan-900/20 p-3 rounded-md">
                  <div className="text-sm font-medium text-cyan-800 dark:text-cyan-300">
                    Decimal Value
                  </div>
                  <div className="text-xl font-mono mt-1">
                    {currentStep * 2}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
              <h3 className="text-lg font-medium mb-2">Common PC Operations</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 px-2 py-1 rounded mr-2 font-mono">
                    JUMP
                  </span>
                  <span>
                    Sets the PC to a new position (unconditional jump)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 px-2 py-1 rounded mr-2 font-mono">
                    JUMPI
                  </span>
                  <span>
                    Sets the PC to a new position if a condition is true
                    (conditional jump)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="bg-cyan-100 dark:bg-cyan-900/30 text-cyan-800 dark:text-cyan-300 px-2 py-1 rounded mr-2 font-mono">
                    JUMPDEST
                  </span>
                  <span>
                    Valid destination for jumps (no operation, just a marker)
                  </span>
                </li>
              </ul>
            </div>
          </div>
        );
        break
      default:
        return
    }

    setModalInfo({
      isOpen: true,
      title,
      description,
      content,
    })
  }

  // Update nodes when props change
  const updateNodes = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === "transaction") {
          node.data = {
            transaction,
            isActive: currentStep > 0,
            onClick: () => handleNodeClick("transaction"),
          }
        } else if (node.id === "worldState") {
          node.data = {
            worldState,
            isActive: currentStep > 7,
            onClick: () => handleNodeClick("worldState"),
          }
        } else if (node.id === "stack") {
          node.data = {
            stack,
            step: currentStep,
            isActive: currentStep >= 1 && currentStep <= 5,
            onClick: () => handleNodeClick("stack"),
          }
        } else if (node.id === "memory") {
          node.data = {
            memory,
            step: currentStep,
            isActive: currentStep >= 3 && currentStep <= 4,
            onClick: () => handleNodeClick("memory"),
          }
        } else if (node.id === "storage") {
          node.data = {
            storage,
            step: currentStep,
            isActive: currentStep >= 6 && currentStep <= 8,
            onClick: () => handleNodeClick("storage"),
          }
        } else if (node.id === "opcode") {
          node.data = {
            opcode: currentOpcode,
            gasCost: currentStep > 0 ? 3 : 0,
            step: currentStep,
            isActive: currentStep > 0 && currentStep <= 6,
            onClick: () => handleNodeClick("opcode"),
          }
        } else if (node.id === "programCounter") {
          node.data = {
            pc: currentStep > 0 ? currentStep * 2 : 0,
            step: currentStep,
            isActive: currentStep > 1,
            onClick: () => handleNodeClick("programCounter"),
          }
        }
        return node
      }),
    )
  }, [transaction, worldState, stack, memory, storage, currentOpcode, currentStep, setNodes])

  // Update edges when currentStep changes
  const updateEdges = useCallback(() => {
    setEdges((eds) =>
      eds.map((edge) => {
        if (edge.id === "transaction-worldState") {
          edge.animated = currentStep > 0 && currentStep <= 10
        } else if (edge.id === "transaction-opcode") {
          edge.animated = currentStep > 0 && currentStep <= 2
        } else if (edge.id === "opcode-programCounter") {
          edge.animated = currentStep > 1 && currentStep <= 3
        } else if (edge.id === "opcode-stack") {
          edge.animated = currentStep > 1 && currentStep <= 3
        } else if (edge.id === "opcode-memory") {
          edge.animated = currentStep > 2 && currentStep <= 4
        } else if (edge.id === "opcode-storage") {
          edge.animated = currentStep > 3 && currentStep <= 6
        } else if (edge.id === "storage-worldState") {
          edge.animated = currentStep > 6 && currentStep <= 8
        } else if (edge.id === "stack-memory") {
          edge.animated = currentStep > 2 && currentStep <= 4
        } else if (edge.id === "memory-storage") {
          edge.animated = currentStep > 4 && currentStep <= 6
        }
        return edge
      }),
    )
  }, [currentStep, setEdges])

  // Update nodes and edges when props change
  React.useEffect(() => {
    updateNodes()
    updateEdges()
  }, [updateNodes, updateEdges, transaction, worldState, stack, memory, storage, currentOpcode, currentStep])

  // Function to fit view
  const fitView = () => {
    if (reactFlowInstance) {
      reactFlowInstance.fitView({ padding: 0.2 })
    }
  }

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={2}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: { strokeWidth: 2 },
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
        }}
        connectionLineType={ConnectionLineType.SmoothStep}
        onInit={setReactFlowInstance}
        className="dark:bg-slate-900" // Add this line for dark mode
      >
        <Background className="dark:bg-slate-900" />
        <Controls className="dark:bg-slate-800 dark:text-white" />

        {/* Add a panel with fit view button */}
        <Panel position="top-right" className="bg-white dark:bg-slate-800 p-2 rounded-md shadow-md">
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={fitView} className="flex items-center gap-1">
              <ZoomIn className="h-4 w-4" />
              <span>Fit View</span>
            </Button>
            <div className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Click on any component for details
            </div>
          </div>
        </Panel>
      </ReactFlow>

      {/* Node info modal */}
      <NodeInfoModal
        isOpen={modalInfo.isOpen}
        title={modalInfo.title}
        description={modalInfo.description}
        content={modalInfo.content}
        onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
      />
    </div>
  )
}

