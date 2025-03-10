"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import type { EVMStack } from "@/types/evm"

interface StackNodeProps {
  data: {
    stack: EVMStack
    step: number
    isActive: boolean
    onClick: () => void
  }
}

export function StackNode({ data }: StackNodeProps) {
  const { stack, step, isActive, onClick } = data
  const maxItems = 5 // Maximum number of items to display

  // Determine which items to highlight based on the step
  const getHighlightClass = (index: number) => {
    if (step === 1 && index === 0) return "animate-pulse bg-blue-100 dark:bg-blue-900/50"
    if (step === 2 && index === 1) return "animate-pulse bg-blue-100 dark:bg-blue-900/50"
    if (step === 3 && index === 2) return "animate-pulse bg-blue-100 dark:bg-blue-900/50"
    if (step === 5 && index === 3) return "animate-pulse bg-blue-100 dark:bg-blue-900/50"
    return "bg-slate-100 dark:bg-slate-800"
  }

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500" />

      <Card
        className={`min-w-[220px] border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">Stack (LIFO)</div>
            <div className="flex items-center gap-1">
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                Items: {stack.items.length}
              </div>
              <Info className="h-4 w-4 text-blue-500" />
            </div>
          </div>

          {stack.items.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-md">
              Stack is empty
            </div>
          ) : (
            <div className="space-y-1">
              {/* Visual stack representation */}
              <div className="flex flex-col-reverse space-y-reverse space-y-1 border border-blue-200 dark:border-blue-800 rounded-md overflow-hidden">
                {stack.items.slice(0, maxItems).map((item, i) => (
                  <div
                    key={i}
                    className={`text-xs font-mono text-slate-600 dark:text-slate-300 p-2 border-t border-blue-200 dark:border-blue-800 ${getHighlightClass(i)}`}
                  >
                    <div className="flex items-center">
                      <div className="w-5 h-5 flex items-center justify-center bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-md text-xs font-medium mr-2">
                        {i}
                      </div>
                      <div className="truncate">{item.substring(0, 14)}...</div>
                    </div>
                  </div>
                ))}

                {stack.items.length > maxItems && (
                  <div className="text-xs text-center text-slate-500 dark:text-slate-400 p-1 bg-blue-100/50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800">
                    + {stack.items.length - maxItems} more items
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

