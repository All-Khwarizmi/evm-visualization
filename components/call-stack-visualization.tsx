"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CallFrame {
  type: "CALL" | "DELEGATECALL" | "STATICCALL" | "CREATE" | "CREATE2"
  from: string
  to: string
  value: string
  gasLimit: number
  depth: number
}

interface CallStackVisualizationProps {
  callStack: CallFrame[]
  currentDepth: number
}

export function CallStackVisualization({ callStack, currentDepth }: CallStackVisualizationProps) {
  const getCallTypeColor = (type: CallFrame["type"]) => {
    switch (type) {
      case "CALL":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
      case "DELEGATECALL":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
      case "STATICCALL":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300"
      case "CREATE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
      case "CREATE2":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Call Stack</CardTitle>
        <CardDescription>Visualize nested contract calls</CardDescription>
      </CardHeader>
      <CardContent>
        {callStack.length === 0 ? (
          <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-md">
            No contract calls in this execution
          </div>
        ) : (
          <div className="space-y-2">
            {callStack.map((frame, index) => (
              <div
                key={index}
                className={`
                  p-3 rounded-md border-l-4 
                  ${index === currentDepth ? "bg-slate-100 dark:bg-slate-800 border-indigo-500" : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"}
                  ${frame.depth > 0 ? `ml-${frame.depth * 4}` : ""}
                `}
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge className={`${getCallTypeColor(frame.type)}`}>{frame.type}</Badge>
                  {index === currentDepth && (
                    <Badge
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                    >
                      Active
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">From:</span>
                    <div className="font-mono truncate">{frame.from}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">To:</span>
                    <div className="font-mono truncate">{frame.to}</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Value:</span>
                    <div className="font-mono">{frame.value} ETH</div>
                  </div>
                  <div>
                    <span className="text-slate-500 dark:text-slate-400">Gas:</span>
                    <div className="font-mono">{frame.gasLimit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

