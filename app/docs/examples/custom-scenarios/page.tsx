"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CustomScenariosPage() {
  const [copied, setCopied] = useState(false);
  const router = useRouter();
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
          <Link
            href="/docs/examples"
            className="hover:text-slate-900 dark:hover:text-slate-200"
          >
            Examples
          </Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span>Custom Scenarios</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Creating Custom EVM Scenarios
        </h1>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <p className="lead text-xl text-slate-600 dark:text-slate-400">
            Learn how to create, share, and contribute custom EVM execution
            scenarios to help others understand complex blockchain interactions.
          </p>

          <h2 id="what-are-scenarios">What are EVM Scenarios?</h2>
          <p>
            EVM Scenarios are structured representations of Ethereum
            transactions and their execution steps. They allow you to visualize
            how the EVM processes transactions, manipulates stack, memory, and
            storage, and updates the world state.
          </p>

          <p>
            Scenarios are particularly useful for educational purposes,
            debugging complex transactions, and understanding how different
            smart contract interactions work under the hood.
          </p>

          <h2 id="scenario-structure">Scenario Structure</h2>
          <p>
            An EVM Scenario consists of a transaction definition and a series of
            execution steps. Each step represents a point in time during the
            transaction execution, with specific values for stack, memory,
            storage, and other EVM components.
          </p>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-0">
                <Tabs defaultValue="typescript">
                  <TabsList className="border-b border-slate-200 dark:border-slate-800 px-4">
                    <TabsTrigger value="typescript">TypeScript</TabsTrigger>
                    <TabsTrigger value="json">JSON</TabsTrigger>
                  </TabsList>
                  <TabsContent value="typescript" className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-b-md overflow-x-auto">
                      <code>{`import type { EVMScenario } from "@/types/scenarios";

// Example scenario definition
const myScenario: EVMScenario = {
  // Basic information
  name: "Simple Value Transfer",
  description: "Basic ETH transfer between two accounts",
  
  // Transaction details
  transaction: {
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1234567890123456789012345678901234567890",
    value: "0.1",
    gasLimit: 21000,
    gasPrice: 20,
    data: "0x",
    nonce: 5,
  },
  
  // Execution steps
  steps: [
    {
      description: "Transaction initiated",
      opcodes: [],
      stack: [],
      memory: "",
      storage: {},
    },
    {
      description: "Pushing value to stack",
      opcodes: ["PUSH1 0x60"],
      stack: ["0x60"],
      memory: "",
      storage: {},
    },
    {
      description: "Storing value in memory",
      opcodes: ["MSTORE"],
      stack: [],
      memory: "0x0000000000000000000000000000000000000000000000000000000000000060",
      storage: {},
    },
    // More steps...
  ],
};`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 text-slate-400 hover:text-slate-100"
                      onClick={() =>
                        copyToClipboard(`import type { EVMScenario } from "@/types/scenarios";

// Example scenario definition
const myScenario: EVMScenario = {
  // Basic information
  name: "Simple Value Transfer",
  description: "Basic ETH transfer between two accounts",
  
  // Transaction details
  transaction: {
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1234567890123456789012345678901234567890",
    value: "0.1",
    gasLimit: 21000,
    gasPrice: 20,
    data: "0x",
    nonce: 5,
  },
  
  // Execution steps
  steps: [
    {
      description: "Transaction initiated",
      opcodes: [],
      stack: [],
      memory: "",
      storage: {},
    },
    {
      description: "Pushing value to stack",
      opcodes: ["PUSH1 0x60"],
      stack: ["0x60"],
      memory: "",
      storage: {},
    },
    {
      description: "Storing value in memory",
      opcodes: ["MSTORE"],
      stack: [],
      memory: "0x0000000000000000000000000000000000000000000000000000000000000060",
      storage: {},
    },
    // More steps...
  ],
};`)
                      }
                    >
                      {copied ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TabsContent>
                  <TabsContent value="json" className="relative">
                    <pre className="bg-slate-950 text-slate-50 p-4 rounded-b-md overflow-x-auto">
                      <code>{`{
  "name": "Simple Value Transfer",
  "description": "Basic ETH transfer between two accounts",
  "transaction": {
    "from": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "to": "0x1234567890123456789012345678901234567890",
    "value": "0.1",
    "gasLimit": 21000,
    "gasPrice": 20,
    "data": "0x",
    "nonce": 5
  },
  "steps": [
    {
      "description": "Transaction initiated",
      "opcodes": [],
      "stack": [],
      "memory": "",
      "storage": {}
    },
    {
      "description": "Pushing value to stack",
      "opcodes": ["PUSH1 0x60"],
      "stack": ["0x60"],
      "memory": "",
      "storage": {}
    },
    {
      "description": "Storing value in memory",
      "opcodes": ["MSTORE"],
      "stack": [],
      "memory": "0x0000000000000000000000000000000000000000000000000000000000000060",
      "storage": {}
    }
  ]
}`}</code>
                    </pre>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-3 right-3 h-8 w-8 text-slate-400 hover:text-slate-100"
                      onClick={() =>
                        copyToClipboard(`{
  "name": "Simple Value Transfer",
  "description": "Basic ETH transfer between two accounts",
  "transaction": {
    "from": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    "to": "0x1234567890123456789012345678901234567890",
    "value": "0.1",
    "gasLimit": 21000,
    "gasPrice": 20,
    "data": "0x",
    "nonce": 5
  },
  "steps": [
    {
      "description": "Transaction initiated",
      "opcodes": [],
      "stack": [],
      "memory": "",
      "storage": {}
    },
    {
      "description": "Pushing value to stack",
      "opcodes": ["PUSH1 0x60"],
      "stack": ["0x60"],
      "memory": "",
      "storage": {}
    },
    {
      "description": "Storing value in memory",
      "opcodes": ["MSTORE"],
      "stack": [],
      "memory": "0x0000000000000000000000000000000000000000000000000000000000000060",
      "storage": {}
    }
  ]
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

          <h3 id="scenario-fields">Scenario Fields</h3>
          <p>Each scenario consists of the following fields:</p>

          <ul>
            <li>
              <strong>name</strong>: A descriptive name for the scenario (e.g.,
              &apos;ERC-20 Token Transfer&apos;)
            </li>
            <li>
              <strong>description</strong>: A detailed explanation of what the
              scenario demonstrates
            </li>
            <li>
              <strong>transaction</strong>: The transaction details that
              initiate the scenario
              <ul>
                <li>
                  <strong>from</strong>: The sender&apos;s Ethereum address
                </li>
                <li>
                  <strong>to</strong>: The recipient&apos;s Ethereum address (or
                  contract address)
                </li>
                <li>
                  <strong>value</strong>: The amount of ETH to transfer (as a
                  string)
                </li>
                <li>
                  <strong>gasLimit</strong>: The maximum gas allowed for the
                  transaction
                </li>
                <li>
                  <strong>gasPrice</strong>: The gas price in Gwei
                </li>
                <li>
                  <strong>data</strong>: The transaction data (bytecode or
                  encoded function call)
                </li>
                <li>
                  <strong>nonce</strong>: The transaction nonce
                </li>
              </ul>
            </li>
            <li>
              <strong>steps</strong>: An array of execution steps, each
              containing:
              <ul>
                <li>
                  <strong>description</strong>: A description of what happens in
                  this step
                </li>
                <li>
                  <strong>opcodes</strong>: The EVM opcodes executed in this
                  step
                </li>
                <li>
                  <strong>stack</strong>: The state of the stack after this step
                </li>
                <li>
                  <strong>memory</strong>: The state of memory after this step
                  (as a hex string)
                </li>
                <li>
                  <strong>storage</strong>: The state of storage after this step
                  (as a key-value object)
                </li>
                <li>
                  <strong>worldState</strong> (optional): Changes to the world
                  state in this step
                </li>
                <li>
                  <strong>gasUsed</strong> (optional): Gas used up to this step
                </li>
                <li>
                  <strong>gasRemaining</strong> (optional): Gas remaining after
                  this step
                </li>
              </ul>
            </li>
          </ul>

          <h2 id="creating-scenarios">Creating Scenarios</h2>
          <p>There are two ways to create custom scenarios:</p>

          <h3 id="using-ui">Using the Scenario Builder UI</h3>
          <p>
            The EVM Visualizer includes a built-in Scenario Builder that allows
            you to create scenarios through a user-friendly interface:
          </p>

          <ol>
            <li>Launch the EVM Visualizer</li>
            <li>
              Click the &quot;Create Custom Scenario&quot; button in the top
              toolbar
            </li>
            <li>Fill in the basic information and transaction details</li>
            <li>
              Add execution steps with their respective stack, memory, and
              storage states
            </li>
            <li>Preview and save your scenario</li>
          </ol>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-4">
                <img
                  src="https://img.freepik.com/vecteurs-libre/style-dechire-arrive-bientot-modele-promotion-pour-post-reseaux-sociaux_1017-55783.jpg"
                  alt="Scenario Builder UI"
                  className="w-full rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          <h3 id="manual-creation">Manual Creation</h3>
          <p>
            For more complex scenarios, you can create them manually by writing
            a JSON file or TypeScript definition:
          </p>

          <ol>
            <li>Create a new JSON file following the scenario structure</li>
            <li>Define the transaction details and execution steps</li>
            <li>
              Import the scenario into the EVM Visualizer using the &quot;Import
              Scenario&quot; option
            </li>
          </ol>

          <h2 id="best-practices">Best Practices for Scenario Creation</h2>
          <p>
            To create high-quality, educational scenarios, follow these best
            practices:
          </p>

          <h3 id="accuracy">Ensure Accuracy</h3>
          <p>
            Make sure your scenario accurately represents how the EVM would
            execute the transaction. This includes correct opcode sequences,
            stack manipulations, and state changes.
          </p>

          <h3 id="granularity">Appropriate Granularity</h3>
          <p>
            Choose an appropriate level of detail for your steps. Too many steps
            can be overwhelming, while too few might skip important details. Aim
            for 5-15 steps for most scenarios.
          </p>

          <h3 id="descriptions">Clear Descriptions</h3>
          <p>
            Write clear, concise descriptions for each step that explain
            what&apos;s happening and why. This helps users understand the
            purpose of each operation.
          </p>

          <h3 id="educational-value">Educational Value</h3>
          <p>
            Focus on scenarios that demonstrate important concepts or common
            patterns in Ethereum development. Examples include token transfers,
            flash loans, or common security vulnerabilities.
          </p>

          <h2 id="contributing">Contributing Scenarios</h2>
          <p>
            We welcome contributions of high-quality scenarios to the EVM
            Visualizer project. To contribute a scenario:
          </p>

          <ol>
            <li>Create your scenario following the guidelines above</li>
            <li>Export it as a JSON file</li>
            <li>
              Submit a pull request to the{" "}
              <a
                href="https://github.com/All-Khwarizmi/evm-visualization"
                className="text-purple-600 dark:text-purple-400"
                target="blank"
              >
                EVM Visualizer repository
              </a>
              , adding your scenario to the <code>scenarios/community</code>{" "}
              directory
            </li>
            <li>
              Include a brief description of what your scenario demonstrates in
              the PR description
            </li>
          </ol>

          <p>
            For more detailed contribution guidelines, see our{" "}
            <a
              href="https://github.com/All-Khwarizmi/evm-visualization/blob/master/CONTRIBUTING.md"
              className="text-purple-600 dark:text-purple-400"
              target="blank"
            >
              Contributing Guide
            </a>
            .
          </p>

          <h2 id="example-scenarios">Example Scenarios</h2>
          <p>
            To help you get started, here are some example scenarios that
            demonstrate different aspects of EVM execution:
          </p>

          <h3 id="simple-transfer">Simple ETH Transfer</h3>
          <p>
            A basic scenario showing a transfer of ETH from one address to
            another. This demonstrates the fundamental flow of a transaction
            through the EVM.
          </p>

          <h3 id="erc20-transfer">ERC-20 Token Transfer</h3>
          <p>
            Shows how an ERC-20 token transfer works, including the function
            call encoding, storage access, and event emission.
          </p>

          <h3 id="contract-deployment">Contract Deployment</h3>
          <p>
            Demonstrates how contract creation works in the EVM, including
            bytecode execution and storage initialization.
          </p>

          <div className="not-prose mt-10 flex items-center justify-between">
            <Button
              onClick={() => {
                router.back();
              }}
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
            {/* <Button asChild>
              <Link href="/docs/examples/flash-loan">
                Next: Flash Loan Example
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button> */}
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
