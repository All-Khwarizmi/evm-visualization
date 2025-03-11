"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function DeveloperGuidePage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
          <span>Developer Guide</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          EVM Visualizer Developer Guide
        </h1>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <p className="lead text-xl text-slate-600 dark:text-slate-400">
            Learn how to extend, customize, and contribute to the EVM Visualizer
            project.
          </p>

          <h2 id="architecture">Architecture Overview</h2>
          <p>
            The EVM Visualizer is built with a modular architecture that allows
            for easy extension and customization. The core components are:
          </p>

          <ul>
            <li>
              <strong>EVMVisualizationDashboard</strong>: The main container
              component that orchestrates the visualization.
            </li>
            <li>
              <strong>EVMCanvas</strong>: The interactive canvas that displays
              the EVM components and their relationships.
            </li>
            <li>
              <strong>Custom Nodes</strong>: Specialized components for
              visualizing different aspects of the EVM (Transaction, Stack,
              Memory, Storage, etc.).
            </li>
            <li>
              <strong>Simulation Hooks</strong>: React hooks that manage the
              simulation state and logic.
            </li>
            <li>
              <strong>Detail Panels</strong>: Components that display detailed
              information about each EVM component.
            </li>
          </ul>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-4">
                <img
                  src="https://img.freepik.com/vecteurs-libre/style-dechire-arrive-bientot-modele-promotion-pour-post-reseaux-sociaux_1017-55783.jpg"
                  alt="Coming soon"
                  className="w-full rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          <h2 id="module-system">Module System</h2>
          <p>
            The EVM Visualizer uses a module system to allow for easy extension
            and customization. Modules are self-contained components that can be
            added to the visualization to provide additional functionality.
          </p>

          <h3 id="module-types">Module Types</h3>
          <p>There are several types of modules that can be created:</p>

          <ul>
            <li>
              <strong>Visualization Modules</strong>: Add new visual components
              to the canvas.
            </li>
            <li>
              <strong>Detail Modules</strong>: Add new panels to display
              detailed information.
            </li>
            <li>
              <strong>Simulation Modules</strong>: Extend the simulation logic
              with new features.
            </li>
            <li>
              <strong>Scenario Modules</strong>: Add pre-configured transaction
              scenarios.
            </li>
          </ul>

          <h3 id="creating-modules">Creating Custom Modules</h3>
          <p>
            To create a custom module, you need to implement the appropriate
            interface and register it with the visualizer. Here&apos;s an
            example of creating a custom visualization module:
          </p>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-0">
                <Tabs defaultValue="typescript">
                  <TabsList className="border-b border-slate-200 dark:border-slate-800 px-4">
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                  </TabsList>
                  <TabsContent value="typescript" className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-b-md overflow-x-auto">
                      <code>{`import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from &apos;lucide-react&apos;
import type { CustomNodeProps } from "evm-visualizer"

// Define the props for your custom node
interface MyCustomNodeProps {
  data: {
    customData: any
    isActive: boolean
    onClick: () => void
  }
}

// Create your custom node component
export function MyCustomNode({ data }: MyCustomNodeProps) {
  const { customData, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />

      <Card
        className={\`min-w-[220px] border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 shadow-md cursor-pointer transition-all duration-300 \${
          isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
        }\`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">My Custom Node</div>
            <Info className="h-4 w-4 text-blue-500" />
          </div>

          {/* Your custom node content here */}
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {customData ? JSON.stringify(customData) : "No data available"}
          </div>
        </CardContent>
      </Card>
    </>
  )
}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 text-slate-400 hover:text-slate-100"
                      onClick={() =>
                        copyToClipboard(`import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from &apos;lucide-react&apos;
import type { CustomNodeProps } from "evm-visualizer"

// Define the props for your custom node
interface MyCustomNodeProps {
  data: {
    customData: any
    isActive: boolean
    onClick: () => void
  }
}

// Create your custom node component
export function MyCustomNode({ data }: MyCustomNodeProps) {
  const { customData, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />

      <Card
        className={\`min-w-[220px] border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 shadow-md cursor-pointer transition-all duration-300 \${
          isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
        }\`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">My Custom Node</div>
            <Info className="h-4 w-4 text-blue-500" />
          </div>

          {/* Your custom node content here */}
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {customData ? JSON.stringify(customData) : "No data available"}
          </div>
        </CardContent>
      </Card>
    </>
  )
}`)
                      }
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TabsContent>
                  <TabsContent value="javascript" className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-b-md overflow-x-auto">
                      <code>{`import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from &apos;lucide-react&apos;

// Create your custom node component
export function MyCustomNode({ data }) {
  const { customData, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />

      <Card
        className={\`min-w-[220px] border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 shadow-md cursor-pointer transition-all duration-300 \${
          isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
        }\`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">My Custom Node</div>
            <Info className="h-4 w-4 text-blue-500" />
          </div>

          {/* Your custom node content here */}
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {customData ? JSON.stringify(customData) : "No data available"}
          </div>
        </CardContent>
      </Card>
    </>
  )
}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 text-slate-400 hover:text-slate-100"
                      onClick={() =>
                        copyToClipboard(`import { Handle, Position } from "reactflow"
import { Card, CardContent } from "@/components/ui/card"
import { Info } from &apos;lucide-react&apos;

// Create your custom node component
export function MyCustomNode({ data }) {
  const { customData, isActive, onClick } = data

  return (
    <>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-blue-500" />

      <Card
        className={\`min-w-[220px] border-blue-200 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/30 shadow-md cursor-pointer transition-all duration-300 \${
          isActive ? "ring-2 ring-blue-500 dark:ring-blue-400" : ""
        }\`}
        onClick={onClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-blue-800 dark:text-blue-300">My Custom Node</div>
            <Info className="h-4 w-4 text-blue-500" />
          </div>

          {/* Your custom node content here */}
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {customData ? JSON.stringify(customData) : "No data available"}
          </div>
        </CardContent>
      </Card>
    </>
  )
}`)
                      }
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <p>Then, register your custom node with the visualizer:</p>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-0">
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                  <code>{`import { EVMVisualizationDashboard } from &apos;evm-visualizer&apos;;
import { MyCustomNode } from &apos;./MyCustomNode&apos;;

function App() {
  // Define custom node types
  const customNodeTypes = {
    myCustomNode: MyCustomNode,
  };

  // Define custom node data
  const customNodes = [
    {
      id: "myCustomNode",
      type: "myCustomNode",
      data: {
        customData: { key: "value" },
        isActive: true,
        onClick: () => console.log("Custom node clicked"),
      },
      position: { x: 400, y: 200 },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <EVMVisualizationDashboard 
        customNodeTypes={customNodeTypes}
        customNodes={customNodes}
      />
    </div>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          <h2 id="custom-scenarios">Creating Custom Scenarios</h2>
          <p>
            Scenarios are pre-configured transaction simulations that
            demonstrate specific aspects of the EVM. You can create custom
            scenarios to showcase particular features or behaviors.
          </p>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-0">
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                  <code>{`import { EVMScenario } from &apos;evm-visualizer&apos;;

// Define a custom scenario
export const myCustomScenario: EVMScenario = {
  name: "Custom Token Transfer",
  description: "Demonstrates a simple ERC-20 token transfer",
  transaction: {
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1234567890123456789012345678901234567890", // Token contract address
    value: "0",
    gasLimit: 60000,
    gasPrice: 20,
    data: "0xa9059cbb000000000000000000000000abcdef1234567890abcdef1234567890abcdef00000000000000000000000000000000000000000000000000000000000000064", // transfer(address,uint256)
    nonce: 5,
  },
  steps: [
    {
      description: "Transaction initiated",
      opcodes: ["PUSH1 0x60", "PUSH1 0x40", "MSTORE"],
      stack: ["0x60", "0x40"],
      memory: "0x0000...0060",
      storage: {},
    },
    {
      description: "Decode function selector",
      opcodes: ["CALLDATALOAD", "PUSH4 0xffffffff", "AND"],
      stack: ["0xa9059cbb"],
      memory: "0x0000...0060",
      storage: {},
    },
    // More steps...
  ],
};

// Use the custom scenario
import { EVMVisualizationDashboard } from &apos;evm-visualizer&apos;;
import { myCustomScenario } from &apos;./myCustomScenario&apos;;

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <EVMVisualizationDashboard scenario={myCustomScenario} />
    </div>
  );
}`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          <h2 id="contributing">Contributing to the Project</h2>
          <p>
            We welcome contributions to the EVM Visualizer project! Whether
            you&apos;re fixing bugs, adding features, or improving
            documentation, your help is appreciated.
          </p>

          <h3 id="development-setup">Development Setup</h3>
          <p>To set up the project for development:</p>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-0">
                <pre className="bg-slate-950 text-slate-50 p-4 rounded-md overflow-x-auto">
                  <code>{`# Clone the repository
git clone https://github.com/All-Khwarizmi/evm-visualization
cd evm-visualizer

# Install dependencies
npm install

# Start the development server
npm run dev`}</code>
                </pre>
              </CardContent>
            </Card>
          </div>

          <h3 id="pull-requests">Pull Requests</h3>
          <p>
            When submitting a pull request, please make sure to follow the
            project&apos;s coding standards and include tests for any new
            functionality. All pull requests should be made against the{" "}
            <code>main</code> branch.
          </p>

          <div className="not-prose mt-10">
            <Button asChild variant="outline">
              <Link href="/docs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Docs
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
