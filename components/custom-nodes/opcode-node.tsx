"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"

interface OpcodeNodeProps {
  data: {
    opcode: string
    gasCost: number
    step: number
    isActive: boolean
    onClick: () => void
  }
}

export function OpcodeNode({ data }: OpcodeNodeProps) {
  const { opcode, gasCost, step, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-rose-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-rose-500" />

      <Card
        className={`min-w-[200px] border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30 shadow-md cursor-pointer transition-all duration-800 ${
          isActive ? "ring-2 ring-rose-500 dark:ring-rose-400" : ""
        } ${step > 0 ? "animate-pulse" : ""}`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-rose-800 dark:text-rose-300">Current Opcode</div>
            <Info className="h-4 w-4 text-rose-500" />
          </div>

          {/* Visual opcode representation */}
          <div className="border border-rose-200 dark:border-rose-800 rounded-md overflow-hidden">
            <div className="bg-rose-100 dark:bg-rose-900/30 p-2 text-xs font-medium text-rose-800 dark:text-rose-300 border-b border-rose-200 dark:border-rose-800">
              Instruction
            </div>

            <div className="p-3 bg-white dark:bg-slate-900">
              {opcode ? (
                <div className="flex items-center justify-between">
                  <div className="text-lg font-mono font-bold text-rose-600 dark:text-rose-400">{opcode}</div>
                  <div className="text-xs bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded-full">
                    Gas: {gasCost}
                  </div>
                </div>
              ) : (
                <div className="text-sm text-slate-500 dark:text-slate-400 italic">No active opcode</div>
              )}
            </div>
          </div>

          {/* Bytecode visualization */}
          {opcode && (
            <div className="mt-2 grid grid-cols-8 gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono rounded-sm
                    ${i === 0 ? "bg-rose-200 dark:bg-rose-800 text-rose-800 dark:text-rose-200" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"}`}
                >
                  {i === 0 ? opcode.split(" ")[0].substring(0, 2) : ""}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

