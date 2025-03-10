"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import type { EVMStorage } from "@/types/evm"

interface StorageNodeProps {
  data: {
    storage: EVMStorage
    step: number
    isActive: boolean
    onClick: () => void
  }
}

export function StorageNode({ data }: StorageNodeProps) {
  const { storage, step, isActive, onClick } = data

  // Determine which storage slots to highlight based on the step
  const getHighlightClass = (key: string) => {
    if (step === 6 && key === "0x0") return "animate-pulse bg-amber-100 dark:bg-amber-900/50"
    if (step === 8 && key === "0x1") return "animate-pulse bg-amber-100 dark:bg-amber-900/50"
    return "bg-slate-100 dark:bg-slate-800"
  }

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-amber-500" />
      <Handle type="source" position={Position.Left} className="w-3 h-3 bg-amber-500" />

      <Card
        className={`min-w-[220px] border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950/30 shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? "ring-2 ring-amber-500 dark:ring-amber-400" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-amber-800 dark:text-amber-300">Storage</div>
            <div className="flex items-center gap-1">
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-amber-100 dark:bg-amber-900/30 px-2 py-0.5 rounded-full">
                Slots: {Object.keys(storage.slots).length}
              </div>
              <Info className="h-4 w-4 text-amber-500" />
            </div>
          </div>

          {Object.keys(storage.slots).length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-md">
              Storage is empty
            </div>
          ) : (
            <div className="space-y-1">
              {/* Visual storage representation */}
              <div className="border border-amber-200 dark:border-amber-800 rounded-md overflow-hidden">
                <div className="grid grid-cols-2 gap-0 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 p-2 border-b border-amber-200 dark:border-amber-800">
                  <div>Key</div>
                  <div>Value</div>
                </div>

                {Object.entries(storage.slots).map(([key, value]) => (
                  <div
                    key={key}
                    className={`grid grid-cols-2 gap-2 p-2 text-xs font-mono text-slate-600 dark:text-slate-300 border-b last:border-b-0 border-amber-200 dark:border-amber-800 ${getHighlightClass(key)}`}
                  >
                    <div className="truncate">{key}</div>
                    <div className="truncate">{typeof value === "string" ? value.substring(0, 10) + "..." : value}</div>
                  </div>
                ))}
              </div>

              {/* Database icon to represent persistent storage */}
              <div className="flex justify-center mt-2">
                <div className="flex items-center text-xs text-amber-700 dark:text-amber-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  Persistent Storage
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

