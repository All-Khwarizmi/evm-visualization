import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EVMTransaction } from "@/types/evm"
import { Badge } from "@/components/ui/badge"

interface TransactionDetailsProps {
  transaction: EVMTransaction
}

export function TransactionDetails({ transaction }: TransactionDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Transaction Details</CardTitle>
          <CardDescription>Information about the current transaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">From:</div>
              <div className="text-sm font-mono break-all">{transaction.from}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">To:</div>
              <div className="text-sm font-mono break-all">{transaction.to}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Value:</div>
              <div className="text-sm font-mono">{transaction.value} ETH</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Gas Limit:</div>
              <div className="text-sm font-mono">{transaction.gasLimit}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Gas Price:</div>
              <div className="text-sm font-mono">{transaction.gasPrice} Gwei</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Nonce:</div>
              <div className="text-sm font-mono">{transaction.nonce}</div>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-1">
              <div className="text-sm font-medium text-slate-500 dark:text-slate-400">Type:</div>
              <div className="text-sm">
                {transaction.to === "0x0000000000000000000000000000000000000000" ? (
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
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {transaction.data && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Transaction Data</CardTitle>
            <CardDescription>Input data for the transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
              <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">{transaction.data}</pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

