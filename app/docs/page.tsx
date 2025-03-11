"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowRight,
  Book,
  Code,
  FileText,
  Layers,
  Lightbulb,
  Rocket,
} from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            EVM Visualizer Documentation
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive guides, references, and examples to help you
            understand the Ethereum Virtual Machine through interactive
            visualization.
          </p>
        </div>

        <Tabs defaultValue="guides" className="mb-12">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="reference">Reference</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          <TabsContent value="guides" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Rocket className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Getting Started</CardTitle>
                  <CardDescription>
                    Learn the basics of EVM Visualizer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Introduction to EVM Visualizer</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>User interface overview</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Your first visualization</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/getting-started">
                      Read Getting Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Book className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Core Concepts</CardTitle>
                  <CardDescription>
                    Understand the key components of the EVM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Transactions and execution</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Stack, memory, and storage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Gas and execution costs</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/core-concepts">
                      Explore Core Concepts
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Advanced Usage</CardTitle>
                  <CardDescription>
                    Take your understanding to the next level
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Custom transaction scenarios</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Contract interactions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Debugging complex executions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button disabled asChild variant="outline" className="w-full">
                    <Link href="/docs/advanced-usage">
                      View Advanced Usage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Integration Guide</CardTitle>
                  <CardDescription>
                    Use EVM Visualizer in your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Embedding in educational platforms</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>Using with development tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      <span>API reference for developers</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/integration-guide">
                      Read Integration Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reference" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>EVM Opcodes</CardTitle>
                  <CardDescription>
                    Complete reference of EVM instructions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Comprehensive documentation of all EVM opcodes, their gas
                    costs, stack effects, and usage examples.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/reference/opcodes">
                      View Opcode Reference
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>EVM Architecture</CardTitle>
                  <CardDescription>
                    Detailed explanation of EVM components
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    In-depth documentation of the EVM architecture, including
                    execution context, memory model, and state transitions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/reference/architecture">
                      Explore Architecture
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>User Interface</CardTitle>
                  <CardDescription>Visualizer UI documentation</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Complete reference for the EVM Visualizer user interface,
                    including all components, controls, and features.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/reference/ui">
                      View UI Reference
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Rocket className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Gas Costs</CardTitle>
                  <CardDescription>Detailed gas cost reference</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Comprehensive reference of gas costs for all EVM operations,
                    including memory expansion, storage operations, and more.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/reference/gas">
                      View Gas Reference
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="examples" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Basic Transactions</CardTitle>
                  <CardDescription>Simple transaction examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Step-by-step examples of basic Ethereum transactions,
                    including value transfers and simple contract interactions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/examples/basic-transactions">
                      View Basic Examples
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Smart Contract Execution</CardTitle>
                  <CardDescription>
                    Contract deployment and interaction
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Examples of smart contract deployment, function calls, and
                    complex interactions between contracts.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/examples/smart-contracts">
                      View Contract Examples
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>DeFi Transactions</CardTitle>
                  <CardDescription>
                    Complex DeFi interaction examples
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Examples of complex DeFi transactions, including swaps,
                    liquidity provision, and flash loans.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/examples/defi-transactions">
                      View DeFi Examples
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-6 w-6 text-purple-600 dark:text-purple-400 mb-2" />
                  <CardTitle>Custom Scenarios</CardTitle>
                  <CardDescription>
                    Create and share your own EVM scenarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Learn how to create, import, export, and share custom EVM
                    execution scenarios to visualize specific transactions or
                    smart contract interactions.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/docs/examples/custom-scenarios">
                      View Custom Scenarios Guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-10 mt-10">
          <h2 className="text-2xl font-bold mb-6">
            Latest Documentation Updates
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="font-medium text-lg">
                Added Custom Scenario Builder
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                New feature allowing users to create and save their own
                transaction scenarios for visualization.
              </p>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Updated 2 days ago
                </span>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="h-auto p-0 ml-4"
                >
                  <Link href="/docs/examples/custom-scenarios">Read more</Link>
                </Button>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="font-medium text-lg">
                EVM Opcode Reference Expanded
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Added detailed examples and visualizations for each EVM opcode.
              </p>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Updated 5 days ago
                </span>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="h-auto p-0 ml-4"
                >
                  <Link href="/docs/reference/opcodes">Read more</Link>
                </Button>
              </div>
            </div>

            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="font-medium text-lg">
                New DeFi Transaction Examples
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Added examples for Uniswap V3 swaps and Aave flash loans with
                detailed execution breakdowns.
              </p>
              <div className="flex items-center mt-2 text-sm">
                <span className="text-slate-500 dark:text-slate-400">
                  Updated 1 week ago
                </span>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="h-auto p-0 ml-4"
                >
                  <Link href="/docs/examples/defi-transactions">Read more</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
