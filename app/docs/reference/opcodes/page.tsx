"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {  useState } from "react";

// Sample opcode data
const opcodes = [
  {
    name: "PUSH1",
    code: "0x60",
    gas: 3,
    category: "Stack",
    description: "Place 1 byte item on stack",
    stackEffect: "+1",
    example: "PUSH1 0x60",
  },
  {
    name: "MSTORE",
    code: "0x52",
    gas: 3,
    category: "Memory",
    description: "Save word to memory",
    stackEffect: "-2",
    example: "MSTORE",
  },
  {
    name: "SSTORE",
    code: "0x55",
    gas: 20000,
    category: "Storage",
    description: "Save word to storage",
    stackEffect: "-2",
    example: "SSTORE",
  },
  {
    name: "CALL",
    code: "0xF1",
    gas: 100,
    category: "System",
    description: "Message-call into an account",
    stackEffect: "-7, +1",
    example: "CALL",
  },
  {
    name: "ADD",
    code: "0x01",
    gas: 3,
    category: "Arithmetic",
    description: "Addition operation",
    stackEffect: "-2, +1",
    example: "ADD",
  },
  {
    name: "JUMPI",
    code: "0x57",
    gas: 10,
    category: "Control Flow",
    description: "Conditional jump",
    stackEffect: "-2",
    example: "JUMPI",
  },
];

export default function OpcodesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const router = useRouter();

  // Filter opcodes based on search term and category
  const filteredOpcodes = opcodes.filter((opcode) => {
    const matchesSearch =
      opcode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      opcode.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || opcode.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [
    "all",
    ...Array.from(new Set(opcodes.map((opcode) => opcode.category))),
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
          <Link
            href="/docs"
            className="hover:text-slate-900 dark:hover:text-slate-200"
          >
            Docs
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <Link
            href="/docs/reference"
            className="hover:text-slate-900 dark:hover:text-slate-200"
          >
            Reference
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Opcodes</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          EVM Opcode Reference
        </h1>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <p className="lead text-xl text-slate-600 dark:text-slate-400">
            Comprehensive reference of all Ethereum Virtual Machine (EVM)
            opcodes, their gas costs, stack effects, and usage examples.
          </p>

          <div className="not-prose mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search opcodes..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full sm:w-auto"
              >
                <TabsList>
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            <div className="grid gap-4">
              {filteredOpcodes.length > 0 ? (
                filteredOpcodes.map((opcode) => (
                  <Card key={opcode.name}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          {opcode.name}
                          <span className="ml-2 text-sm font-mono text-slate-500 dark:text-slate-400">
                            {opcode.code}
                          </span>
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <span className="text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                            Gas: {opcode.gas}
                          </span>
                          <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded">
                            {opcode.category}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Description
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {opcode.description}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium mb-1">
                            Stack Effect
                          </h3>
                          <p className="text-sm font-mono">
                            {opcode.stackEffect}
                          </p>
                          <h3 className="text-sm font-medium mt-3 mb-1">
                            Example
                          </h3>
                          <p className="text-sm font-mono bg-slate-100 dark:bg-slate-800 p-2 rounded">
                            {opcode.example}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 text-right">
                        <Button
                          disabled
                          variant="link"
                          size="sm"
                          className="h-auto p-0"
                        >
                          {/* <Link href={`/docs/reference/opcodes/${opcode.name.toLowerCase()}`}> */}
                          View detailed documentation
                          {/* </Link> */}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-500 dark:text-slate-400">
                    No opcodes found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="not-prose mt-10">
            <Button
              onClick={() => {
                router.back();
              }}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
