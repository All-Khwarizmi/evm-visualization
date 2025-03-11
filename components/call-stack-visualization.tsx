"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { defaultCallStack } from "@/constants/evm-simulation-data";

interface CallFrame {
  type: "CALL" | "DELEGATECALL" | "STATICCALL" | "CREATE" | "CREATE2";
  from: string;
  to: string;
  value: string;
  gasLimit: number;
  depth: number;
}

interface CallStackVisualizationProps {
  callStack?: CallFrame[];
  currentDepth?: number;
}

export function CallStackVisualization({
  callStack = defaultCallStack,
  currentDepth = 0,
}: CallStackVisualizationProps) {
  const getCallTypeColor = (type: CallFrame["type"]) => {
    switch (type) {
      case "CALL":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "DELEGATECALL":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      case "STATICCALL":
        return "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300";
      case "CREATE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      case "CREATE2":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300";
    }
  };

  // Descriptions of different call types
  const getCallTypeDescription = (type: CallFrame["type"]) => {
    switch (type) {
      case "CALL":
        return "Regular call that can transfer ETH and modify state";
      case "DELEGATECALL":
        return "Executes callee's code in caller's context (same msg.sender)";
      case "STATICCALL":
        return "Read-only call that cannot modify state";
      case "CREATE":
        return "Creates a new contract at a computed address";
      case "CREATE2":
        return "Creates a new contract at a deterministic address";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Call Stack</CardTitle>
        <CardDescription>Visualize nested contract calls</CardDescription>
      </CardHeader>
      <CardContent>
        {callStack.length === 0 ? (
          <div className="text-sm text-slate-500 dark:text-slate-400 italic text-center py-2 border border-dashed border-slate-300 dark:border-slate-700 rounded-md">
            No contract calls in this execution
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              {callStack.map((frame, index) => (
                <div
                  key={index}
                  className={`
                    p-3 rounded-md border-l-4 
                    ${
                      index === currentDepth
                        ? "bg-slate-100 dark:bg-slate-800 border-indigo-500"
                        : "bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700"
                    }
                    ${frame.depth > 0 ? `ml-${frame.depth * 4}` : ""}
                  `}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Badge className={`${getCallTypeColor(frame.type)}`}>
                      {frame.type}
                    </Badge>
                    {index === currentDepth && (
                      <Badge
                        variant="outline"
                        className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-300"
                      >
                        Active
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">
                        From:
                      </span>
                      <div className="font-mono truncate">{frame.from}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">
                        To:
                      </span>
                      <div className="font-mono truncate">{frame.to}</div>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">
                        Value:
                      </span>
                      <div className="font-mono">{frame.value} ETH</div>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">
                        Gas:
                      </span>
                      <div className="font-mono">{frame.gasLimit}</div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {getCallTypeDescription(frame.type)}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-900 rounded-md">
              <p className="font-medium mb-1">Understanding the Call Stack</p>
              <p>
                The EVM maintains a call stack to track contract-to-contract
                interactions. Each call frame represents a separate contract
                execution context. The EVM has a maximum call depth of 1024 to
                prevent stack overflow attacks.
              </p>
              <p className="mt-1">
                This simple transaction only has a single call from the sender's
                account to the recipient, but more complex smart contract
                interactions can have deeply nested calls.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
