"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"

interface ProgramCounterNodeProps {
  data: {
    pc: number
    step: number
    isActive: boolean
    onClick: () => void
  }
}

export function ProgramCounterNode({ data }: ProgramCounterNodeProps) {
  const { pc, step, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-cyan-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-cyan-500" />

      <Card
        className={`min-w-[200px] border-cyan-200 bg-cyan-50 dark:border-cyan-900 dark:bg-cyan-950/30 shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? "ring-2 ring-cyan-500 dark:ring-cyan-400" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-cyan-800 dark:text-cyan-300">Program Counter</div>
            <Info className="h-4 w-4 text-cyan-500" />
          </div>

          {/* Visual program counter representation */}
          <div className="border border-cyan-200 dark:border-cyan-800 rounded-md overflow-hidden">
            <div className="bg-cyan-100 dark:bg-cyan-900/30 p-2 text-xs font-medium text-cyan-800 dark:text-cyan-300 border-b border-cyan-200 dark:border-cyan-800">
              PC Position
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 flex items-center justify-between">
              <div className="text-lg font-mono font-bold text-cyan-600 dark:text-cyan-400">
                0x{pc.toString(16).padStart(4, "0")}
              </div>
              <div className="text-xs bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 px-2 py-0.5 rounded-full">
                Decimal: {pc}
              </div>
            </div>
          </div>

          {/* Bytecode position visualization */}
          <div className="mt-2 relative h-8 border border-cyan-200 dark:border-cyan-800 rounded-md overflow-hidden bg-slate-100 dark:bg-slate-800">
            <div
              className="absolute top-0 bottom-0 left-0 bg-cyan-200 dark:bg-cyan-800 transition-all duration-300"
              style={{ width: `${Math.min((pc / 100) * 100, 100)}%` }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-cyan-800 dark:text-cyan-200">
              Bytecode Position
            </div>
          </div>

          {/* Step indicator */}
          <div className="mt-2 text-xs text-center text-slate-500 dark:text-slate-400">Execution Step: {step} / 10</div>
        </CardContent>
      </Card>
    </>
  )
}

