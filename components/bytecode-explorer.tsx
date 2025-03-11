"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { defaultDisassembledOpcodes } from "@/constants/evm-simulation-data";

interface BytecodeExplorerProps {
  bytecode: string;
  currentOpcode: string;
  currentStep: number;
}

export function BytecodeExplorer({
  bytecode,
  currentOpcode,
  currentStep,
}: BytecodeExplorerProps) {
  const [view, setView] = useState<"raw" | "disassembled">("disassembled");

  // Use our predefined opcodes that match the scenario
  const disassembledOpcodes = defaultDisassembledOpcodes;

  // Format raw bytecode with highlighting
  const formatRawBytecode = () => {
    if (!bytecode) return null;

    // Remove 0x prefix
    const code = bytecode.startsWith("0x") ? bytecode.slice(2) : bytecode;

    // Group into bytes
    const bytes = [];
    for (let i = 0; i < code.length; i += 2) {
      bytes.push(code.slice(i, i + 2));
    }

    // Highlight current position (simplified)
    const currentPosition = currentStep * 2;

    return (
      <div className="font-mono text-xs overflow-x-auto whitespace-pre">
        {bytes.map((byte, index) => (
          <span
            key={index}
            className={`inline-block p-1 ${
              index === currentPosition
                ? "bg-yellow-200 dark:bg-yellow-800"
                : ""
            }`}
          >
            {byte}
          </span>
        ))}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-base">Bytecode Explorer</CardTitle>
            <CardDescription>
              Examine the contract bytecode being executed
            </CardDescription>
          </div>
          <Tabs
            value={view}
            onValueChange={(v) => setView(v as "raw" | "disassembled")}
          >
            <TabsList>
              <TabsTrigger value="disassembled">Disassembled</TabsTrigger>
              <TabsTrigger value="raw">Raw</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <TabsContent value="raw" className="mt-0">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md max-h-80 overflow-auto">
            {formatRawBytecode()}
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <p>
              Raw EVM bytecode is a sequence of hexadecimal bytes. Each byte or
              sequence of bytes represents an instruction (opcode) or data.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="disassembled" className="mt-0">
          <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-md max-h-80 overflow-auto">
            <table className="w-full text-xs">
              <thead className="text-left">
                <tr>
                  <th className="p-1">Offset</th>
                  <th className="p-1">Opcode</th>
                  <th className="p-1">Value</th>
                  <th className="p-1">Gas</th>
                </tr>
              </thead>
              <tbody>
                {disassembledOpcodes.map((op, index) => (
                  <tr
                    key={index}
                    className={`${
                      index === currentStep - 1
                        ? "bg-yellow-100 dark:bg-yellow-900/30"
                        : ""
                    }`}
                  >
                    <td className="p-1 font-mono">
                      0x{op.offset.toString(16).padStart(2, "0")}
                    </td>
                    <td className="p-1 font-mono">
                      {op.opcode}
                      {op.opcode === currentOpcode?.split(" ")[0] &&
                        index === currentStep - 1 && (
                          <Badge className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                            Current
                          </Badge>
                        )}
                    </td>
                    <td className="p-1 font-mono">{op.value}</td>
                    <td className="p-1 font-mono">{op.gas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            <p>
              The disassembled view shows human-readable opcodes. The EVM
              executes these instructions one by one, manipulating the stack,
              memory, and storage.
            </p>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
}
