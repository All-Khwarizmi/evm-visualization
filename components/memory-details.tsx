import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EVMMemory } from "@/types/evm"

interface MemoryDetailsProps {
  memory: EVMMemory
}

export function MemoryDetails({ memory }: MemoryDetailsProps) {
  // Create a view of memory as 32-byte words
  const memoryWords = []
  for (let i = 0; i < memory.data.length; i += 32) {
    memoryWords.push(memory.data.slice(i, i + 32))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Memory</CardTitle>
          <CardDescription>Byte-addressable, volatile memory</CardDescription>
        </CardHeader>
        <CardContent>
          {memory.data.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">Memory is empty</div>
          ) : (
            <div className="space-y-2">
              {memoryWords.map((word, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-12 shrink-0 py-2 text-center bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-md text-xs font-mono">
                    0x{(index * 32).toString(16).padStart(4, "0")}
                  </div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
                    <div className="text-xs font-mono break-all">{word}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Memory Operations</CardTitle>
          <CardDescription>Common memory manipulation opcodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">MLOAD</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Load word from memory</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">MSTORE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Save word to memory</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">MSTORE8</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Save byte to memory</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">MSIZE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Get memory size</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

