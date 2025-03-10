import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EVMStorage } from "@/types/evm"

interface StorageDetailsProps {
  storage: EVMStorage
}

export function StorageDetails({ storage }: StorageDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Storage</CardTitle>
          <CardDescription>Persistent key-value store (256-bit to 256-bit mapping)</CardDescription>
        </CardHeader>
        <CardContent>
          {Object.keys(storage.slots).length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">Storage is empty</div>
          ) : (
            <div className="space-y-2">
              {Object.entries(storage.slots).map(([key, value]) => (
                <div key={key} className="flex items-start gap-2">
                  <div className="w-12 shrink-0 py-2 text-center bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 rounded-md text-xs font-mono">
                    {key}
                  </div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
                    <div className="text-xs font-mono break-all">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Storage Operations</CardTitle>
          <CardDescription>Common storage manipulation opcodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">SLOAD</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Load word from storage</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">SSTORE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Save word to storage</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

