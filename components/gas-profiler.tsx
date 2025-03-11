"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { defaultOpcodeGasCosts } from "@/constants/evm-simulation-data";

interface GasProfilerProps {
  gasUsed: number;
  gasLimit: number;
  opcodeGasCosts?: Array<{ opcode: string; gas: number }>;
}

export function GasProfiler({
  gasUsed,
  gasLimit,
  opcodeGasCosts = defaultOpcodeGasCosts,
}: GasProfilerProps) {
  const gasPercentage = (gasUsed / gasLimit) * 100;

  // Calculate total gas used by opcodes
  const totalOpcodeGas = opcodeGasCosts.reduce(
    (sum, item) => sum + item.gas,
    0
  );

  // Sort opcodes by gas cost (descending)
  const sortedOpcodes = [...opcodeGasCosts].sort((a, b) => b.gas - a.gas);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Gas Profiler</CardTitle>
        <CardDescription>Analyze gas usage by operation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Gas Used: {gasUsed}</span>
              <span>Gas Limit: {gasLimit}</span>
            </div>
            <Progress value={gasPercentage} className="h-2" />
            <div className="text-xs text-right text-slate-500">
              {gasPercentage.toFixed(1)}% of gas limit consumed
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-medium">Gas Usage by Opcode</div>
            <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-3">
              {sortedOpcodes.length > 0 ? (
                <div className="space-y-2">
                  {sortedOpcodes.map((item, index) => {
                    const percentage = (item.gas / totalOpcodeGas) * 100;
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="font-mono">{item.opcode}</span>
                          <span>
                            {item.gas} gas ({percentage.toFixed(1)}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                          <div
                            className="bg-purple-600 h-1.5 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-2">
                  No gas usage data available
                </div>
              )}
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
            <p className="font-medium mb-1">
              Why do different operations cost different amounts of gas?
            </p>
            <p>
              Gas costs in Ethereum reflect the computational resources required
              for each operation. Storage operations (SSTORE) are the most
              expensive because they permanently change the blockchain state.
              Stack and arithmetic operations (PUSH, ADD) are cheaper as they
              only affect temporary execution state.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
