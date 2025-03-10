import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface ExecutionDetailsProps {
  currentOpcode: string
  gasUsed: number
  gasRemaining: number
}

export function ExecutionDetails({ currentOpcode, gasUsed, gasRemaining }: ExecutionDetailsProps) {
  const totalGas = gasUsed + gasRemaining
  const gasPercentage = totalGas > 0 ? (gasUsed / totalGas) * 100 : 0

  // Get opcode category and description
  const getOpcodeInfo = (opcode: string) => {
    if (!opcode) return { category: "None", description: "No active opcode" }

    const opcodeBase = opcode.split(" ")[0]

    if (opcodeBase.startsWith("PUSH")) {
      return {
        category: "Stack",
        description: "Pushes an immediate value onto the stack",
      }
    } else if (opcodeBase === "MSTORE") {
      return {
        category: "Memory",
        description: "Saves a word to memory",
      }
    } else if (opcodeBase === "CALLVALUE") {
      return {
        category: "Environment",
        description: "Gets the value of the current call in wei",
      }
    } else if (opcodeBase === "DUP1") {
      return {
        category: "Stack",
        description: "Duplicates the 1st stack item",
      }
    } else if (opcodeBase === "ISZERO") {
      return {
        category: "Comparison",
        description: "Pushes 1 if top stack value is 0, otherwise 0",
      }
    } else if (opcodeBase === "JUMPI") {
      return {
        category: "Control Flow",
        description: "Conditional jump to a destination if condition is non-zero",
      }
    } else if (opcodeBase === "REVERT") {
      return {
        category: "System",
        description: "Halt execution reverting state changes but returning data and remaining gas",
      }
    }

    return { category: "Unknown", description: "Unknown opcode" }
  }

  const opcodeInfo = getOpcodeInfo(currentOpcode)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Execution Context</CardTitle>
          <CardDescription>Current execution state of the EVM</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Opcode</div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-mono font-bold">{currentOpcode || "N/A"}</div>
                  {currentOpcode && (
                    <Badge
                      variant="outline"
                      className="bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300 dark:border-rose-800"
                    >
                      {opcodeInfo.category}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{opcodeInfo.description}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Gas Usage</div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">Used: {gasUsed}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">Remaining: {gasRemaining}</span>
                </div>
                <Progress value={gasPercentage} className="h-2" />
                <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {gasPercentage.toFixed(1)}% of gas limit consumed
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">Execution Flow</div>
              <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xs text-purple-700 dark:text-purple-300 mr-2">
                      1
                    </div>
                    <div className="text-xs">Transaction received</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xs text-blue-700 dark:text-blue-300 mr-2">
                      2
                    </div>
                    <div className="text-xs">EVM execution started</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xs text-green-700 dark:text-green-300 mr-2">
                      3
                    </div>
                    <div className="text-xs">State changes applied</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-xs text-amber-700 dark:text-amber-300 mr-2">
                      4
                    </div>
                    <div className="text-xs">World state updated</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Common Opcodes</CardTitle>
          <CardDescription>Frequently used EVM instructions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">PUSH1-32</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Push value to stack</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">ADD/SUB/MUL/DIV</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Arithmetic operations</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">CALL</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Message call to another account</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">JUMP/JUMPI</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Control flow operations</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">SLOAD/SSTORE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Storage operations</div>
            </div>
            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
              <div className="font-medium">MLOAD/MSTORE</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">Memory operations</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

