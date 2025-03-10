import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { EVMStack } from "@/types/evm"

interface StackDetailsProps {
  stack: EVMStack
}

export function StackDetails({ stack }: StackDetailsProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Stack</CardTitle>
          <CardDescription>Last-in, first-out data structure (256-bit values)</CardDescription>
        </CardHeader>
        <CardContent>
          {stack.items.length === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 italic">Stack is empty</div>
          ) : (
            <div className="space-y-2">
              {stack.items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm font-medium">
                    {index}
                  </div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-800 p-2 rounded-md">
                    <div className="text-xs font-mono break-all">{item}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Stack Operations</CardTitle>
          <CardDescription>Common stack manipulation opcodes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">PUSH1-32</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Push item onto stack</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">POP</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Remove item from stack</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">DUP1-16</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Duplicate stack item</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">SWAP1-16</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Exchange stack items</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

