"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { EVMScenario } from "@/types/scenarios"

interface ScenarioPreviewProps {
  scenario: EVMScenario
}

export function ScenarioPreview({ scenario }: ScenarioPreviewProps) {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <CardHeader>
          <CardTitle>{scenario.name || "Unnamed Scenario"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {scenario.description || "No description provided."}
          </p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Transaction Details</h3>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="font-medium">From:</span> {scenario.transaction.from}
                  </div>
                  <div>
                    <span className="font-medium">To:</span> {scenario.transaction.to}
                  </div>
                  <div>
                    <span className="font-medium">Value:</span> {scenario.transaction.value} ETH
                  </div>
                  <div>
                    <span className="font-medium">Nonce:</span> {scenario.transaction.nonce}
                  </div>
                  <div>
                    <span className="font-medium">Gas Limit:</span> {scenario.transaction.gasLimit}
                  </div>
                  <div>
                    <span className="font-medium">Gas Price:</span> {scenario.transaction.gasPrice} Gwei
                  </div>
                </div>
                {scenario.transaction.data && scenario.transaction.data !== "0x" && (
                  <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                    <span className="font-medium text-xs">Data:</span>
                    <div className="font-mono text-xs mt-1 break-all">{scenario.transaction.data}</div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Execution Steps ({scenario.steps.length})</h3>
              <div className="space-y-2">
                {scenario.steps.map((step, index) => (
                  <div key={index} className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium text-xs">
                        Step {index}: {step.description}
                      </h4>
                      <Badge variant="outline" className="text-[10px]">
                        {step.opcodes.length} opcodes
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span className="font-medium">Opcodes:</span>
                        <div className="font-mono mt-1 text-[10px]">
                          {step.opcodes.length > 0 ? step.opcodes.join(", ") : "None"}
                        </div>
                      </div>

                      <div>
                        <span className="font-medium">Stack:</span>
                        <div className="font-mono mt-1 text-[10px]">
                          {step.stack.length > 0 ? step.stack.join(", ") : "Empty"}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

