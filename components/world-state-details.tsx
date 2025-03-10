import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EVMWorldState } from "@/types/evm"
import { Badge } from "@/components/ui/badge"

interface WorldStateDetailsProps {
  worldState: EVMWorldState
}

export function WorldStateDetails({ worldState }: WorldStateDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">World State</CardTitle>
          <CardDescription>Mapping between addresses and account states</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(worldState.accounts).length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">No accounts in world state</div>
          ) : (
            <div className="space-y-4">
              {Object.entries(worldState.accounts).map(([address, account]) => (
                <div key={address} className="border border-slate-200 dark:border-slate-700 rounded-md overflow-hidden">
                  <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 flex items-center justify-between">
                    <div className="text-sm font-medium font-mono truncate">{address}</div>
                    <Badge
                      variant="outline"
                      className="bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-900/20 dark:text-indigo-300 dark:border-indigo-800"
                    >
                      {account.codeHash === "0x0000000000000000000000000000000000000000000000000000000000000000"
                        ? "EOA"
                        : "Contract"}
                    </Badge>
                  </div>
                  <div className="p-3 space-y-2">
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Balance:</div>
                      <div className="text-xs font-mono">{account.balance} ETH</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Nonce:</div>
                      <div className="text-xs font-mono">{account.nonce}</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Code Hash:</div>
                      <div className="text-xs font-mono truncate">{account.codeHash}</div>
                    </div>
                    <div className="grid grid-cols-[100px_1fr] gap-1">
                      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">Storage Root:</div>
                      <div className="text-xs font-mono truncate">{account.storageRoot}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Merkle Patricia Trie</CardTitle>
          <CardDescription>Efficient data structure for the world state</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-md flex justify-center">
            <div className="relative w-64 h-48">
              {/* Root node */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                Root
              </div>

              {/* Branches */}
              <div className="absolute top-16 left-1/4 transform -translate-x-1/2 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                B1
              </div>
              <div className="absolute top-16 left-3/4 transform -translate-x-1/2 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                B2
              </div>

              {/* Leaves */}
              <div className="absolute top-32 left-1/6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                L1
              </div>
              <div className="absolute top-32 left-1/3 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                L2
              </div>
              <div className="absolute top-32 left-2/3 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                L3
              </div>
              <div className="absolute top-32 left-5/6 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 border-2 border-indigo-300 dark:border-indigo-700 flex items-center justify-center text-xs font-mono text-indigo-700 dark:text-indigo-300">
                L4
              </div>

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                {/* Root to branches */}
                <line
                  x1="50%"
                  y1="12"
                  x2="25%"
                  y2="16"
                  stroke="currentColor"
                  className="text-indigo-300 dark:text-indigo-700"
                  strokeWidth="1"
                />
                <line
                  x1="50%"
                  y1="12"
                  x2="75%"
                  y2="16"
                  stroke="currentColor"
                  className="text-indigo-300 dark:text-indigo-700"
                  strokeWidth="1"
                />

                {/* Branches to leaves */}
                <line
                  x1="25%"
                  y1="26"
                  x2="16.67%"
                  y2="32"
                  stroke="currentColor"
                  className="text-indigo-300 dark:text-indigo-700"
                  strokeWidth="1"
                />
                <line
                  x1="25%"
                  y1="26"
                  x2="33.33%"
                  y2="32"
                  stroke="currentColor"
                  className="text-indigo-300 dark:text-indigo-700"
                  strokeWidth="1"
                />
                <line
                  x1="75%"
                  y1="26"
                  x2="66.67%"
                  y2="32"
                  stroke="currentColor"
                  className="text-indigo-300 dark:text-indigo-700"
                  strokeWidth="1"
                />
                <line
                  x1="75%"
                  y1="26"
                  x2="83.33%"
                  y2="32"
                  stroke="currentColor"
                  className="text-indigo-300 dark:text-indigo-700"
                  strokeWidth="1"
                />
              </svg>
            </div>
          </div>
          <div className="mt-2 text-xs text-center text-slate-500 dark:text-slate-400">
            The Merkle Patricia Trie efficiently stores and verifies the world state
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

