"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from "lucide-react"
import type { EVMWorldState } from "@/types/evm"

interface WorldStateNodeProps {
  data: {
    worldState: EVMWorldState
    isActive: boolean
    onClick: () => void
  }
}

export function WorldStateNode({ data }: WorldStateNodeProps) {
  const { worldState, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-indigo-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-indigo-500" />

      <Card
        className={`min-w-[250px] border-indigo-200 bg-indigo-50 dark:border-indigo-900 dark:bg-indigo-950/30 shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? "ring-2 ring-indigo-500 dark:ring-indigo-400" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-indigo-800 dark:text-indigo-300">World State</div>
            <div className="flex items-center gap-1">
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-indigo-100 dark:bg-indigo-900/30 px-2 py-0.5 rounded-full">
                Accounts: {Object.keys(worldState.accounts).length}
              </div>
              <Info className="h-4 w-4 text-indigo-500" />
            </div>
          </div>

          {/* Visual world state representation */}
          <div className="space-y-1">
            <div className="border border-indigo-200 dark:border-indigo-800 rounded-md overflow-hidden">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 text-xs font-medium text-indigo-800 dark:text-indigo-300 border-b border-indigo-200 dark:border-indigo-800">
                Account States
              </div>

              {Object.entries(worldState.accounts).map(([address, account]) => (
                <div key={address} className="p-2 border-b last:border-b-0 border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center mb-1">
                    <div className="w-3 h-3 rounded-full bg-indigo-400 dark:bg-indigo-600 mr-2"></div>
                    <div className="text-xs font-mono text-slate-700 dark:text-slate-300 truncate">
                      {address.substring(0, 10)}...
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className="bg-indigo-100/50 dark:bg-indigo-900/20 p-1 rounded">
                      <span className="text-slate-500 dark:text-slate-400">Balance:</span>
                      <div className="font-mono">{account.balance} ETH</div>
                    </div>
                    <div className="bg-indigo-100/50 dark:bg-indigo-900/20 p-1 rounded">
                      <span className="text-slate-500 dark:text-slate-400">Nonce:</span>
                      <div className="font-mono">{account.nonce}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Merkle tree visualization */}
            <div className="flex justify-center mt-2">
              <div className="flex items-center text-xs text-indigo-700 dark:text-indigo-300">
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
                  <path d="M12 3v5"></path>
                  <path d="M5 10v5"></path>
                  <path d="M19 10v5"></path>
                  <circle cx="12" cy="13" r="2"></circle>
                  <circle cx="5" cy="20" r="2"></circle>
                  <circle cx="19" cy="20" r="2"></circle>
                  <circle cx="12" cy="8" r="2"></circle>
                  <circle cx="5" cy="15" r="2"></circle>
                  <circle cx="19" cy="15" r="2"></circle>
                  <path d="M12 10v1"></path>
                  <path d="M5 15v3"></path>
                  <path d="M19 15v3"></path>
                </svg>
                Merkle Patricia Trie
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

