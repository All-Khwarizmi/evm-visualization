"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import type { EVMMemory } from "@/types/evm"

interface MemoryNodeProps {
  data: {
    memory: EVMMemory
    step: number
    isActive: boolean
    onClick: () => void
  }
}

export function MemoryNode({ data }: MemoryNodeProps) {
  const { memory, step, isActive, onClick } = data

  // Create a view of memory as 32-byte words
  const memoryWords = []
  for (let i = 0; i < memory.data.length; i += 32) {
    memoryWords.push(memory.data.slice(i, i + 32))
  }

  // Determine which memory cells to highlight based on the step
  const getHighlightClass = (index: number) => {
    if (step === 3 && index === 0) return "animate-pulse bg-green-100 dark:bg-green-900/50"
    if (step === 4 && index === 1) return "animate-pulse bg-green-100 dark:bg-green-900/50"
    return "bg-slate-100 dark:bg-slate-800"
  }

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-green-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-500" />

      <Card
        className={`min-w-[220px] border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-950/30 shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? "ring-2 ring-green-500 dark:ring-green-400" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-green-800 dark:text-green-300">Memory</div>
            <div className="flex items-center gap-1">
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                Size: {memory.size} bytes
              </div>
              <Info className="h-4 w-4 text-green-500" />
            </div>
          </div>

          {memory.data.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-md">
              Memory is empty
            </div>
          ) : (
            <div className="space-y-1">
              {/* Visual memory representation */}
              <div className="grid grid-cols-8 gap-1 p-2 border border-green-200 dark:border-green-800 rounded-md">
                {Array.from({ length: 32 }).map((_, i) => {
                  const wordIndex = Math.floor(i / 8)
                  const hasData = wordIndex < memoryWords.length

                  return (
                    <div
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center text-[10px] font-mono rounded-sm
                        ${
                          hasData
                            ? getHighlightClass(wordIndex)
                            : "bg-slate-50 dark:bg-slate-900 text-slate-400 dark:text-slate-600"
                        }`}
                    >
                      {hasData ? i.toString(16).padStart(2, "0") : ""}
                    </div>
                  )
                })}
              </div>

              {/* Memory content preview */}
              <div className="mt-2 text-xs font-mono text-slate-600 dark:text-slate-300 p-2 bg-slate-100 dark:bg-slate-800 rounded-md truncate">
                {memory.preview}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

