"use client"

import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info } from "lucide-react"
import type { EVMTransaction } from "@/types/evm"

interface TransactionNodeProps {
  data: {
    transaction: EVMTransaction
    isActive: boolean
    onClick: () => void
  }
}

export function TransactionNode({ data }: TransactionNodeProps) {
  const { transaction, isActive, onClick } = data
  const isContractCreation = transaction.to === "0x0000000000000000000000000000000000000000"

  return (
    <>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-purple-500" />

      <Card
        className={`min-w-[250px] border-purple-200 bg-purple-50 dark:border-purple-900 dark:bg-purple-950/30 shadow-md cursor-pointer transition-all duration-300 ${
          isActive ? "ring-2 ring-purple-500 dark:ring-purple-400" : ""
        }`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-purple-800 dark:text-purple-300">Transaction</div>
            <div className="flex items-center gap-1">
              {isContractCreation ? (
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800"
                >
                  Contract Creation
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800"
                >
                  Message Call
                </Badge>
              )}
              <Info className="h-4 w-4 text-purple-500" />
            </div>
          </div>

          {/* Visual transaction representation */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-700 dark:text-purple-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"></path>
                  <path d="M8 8H5a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z"></path>
                  <path d="M19 8h-3a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z"></path>
                  <path d="M12 16v4"></path>
                  <path d="M8 20h8"></path>
                  <path d="M12 12v4"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">From:</div>
                <div className="text-xs font-mono truncate">{transaction.from}</div>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-8 flex-shrink-0 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-700 dark:text-purple-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">Value:</div>
                <div className="text-xs font-mono">{transaction.value} ETH</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-purple-700 dark:text-purple-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="M8 12h8"></path>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 dark:text-slate-400">To:</div>
                <div className="text-xs font-mono truncate">{transaction.to}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
              <div className="bg-purple-100/50 dark:bg-purple-900/20 p-1 rounded">
                <span className="text-slate-500 dark:text-slate-400">Gas Limit:</span>
                <div className="font-mono">{transaction.gasLimit}</div>
              </div>
              <div className="bg-purple-100/50 dark:bg-purple-900/20 p-1 rounded">
                <span className="text-slate-500 dark:text-slate-400">Gas Price:</span>
                <div className="font-mono">{transaction.gasPrice} Gwei</div>
              </div>
              <div className="bg-purple-100/50 dark:bg-purple-900/20 p-1 rounded">
                <span className="text-slate-500 dark:text-slate-400">Nonce:</span>
                <div className="font-mono">{transaction.nonce}</div>
              </div>
              <div className="bg-purple-100/50 dark:bg-purple-900/20 p-1 rounded">
                <span className="text-slate-500 dark:text-slate-400">Data Size:</span>
                <div className="font-mono">{transaction.data ? transaction.data.length / 2 - 1 : 0} bytes</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

