"use client";

import { HeroDemo } from "@/components/hero-demo";
import { Button } from "@/components/ui/button";

import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function GettingStartedPage() {
  const dashboardUrl = `${window.location.protocol}//${window.location.host}/dashboard`;
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
          <span>Getting Started</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          Getting Started with EVM Visualizer
        </h1>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <p className="lead text-xl text-slate-600 dark:text-slate-400">
            Learn how to use the EVM Visualizer to understand Ethereum
            transactions and smart contract execution.
          </p>

          <h2 id="introduction">Introduction</h2>
          <p>
            The EVM Visualizer is an interactive tool designed to help
            developers, educators, and students understand the inner workings of
            the Ethereum Virtual Machine (EVM). By visualizing the execution of
            transactions and smart contracts, it provides insights into how the
            EVM processes instructions, manages state, and consumes gas.
          </p>

          <h2 id="accessing-the-visualizer">Accessing the Visualizer</h2>
          <p>
            The EVM Visualizer is a web-based application that you can access
            directly in your browser. No installation is required. Simply visit
            the application at{" "}
            <a href={dashboardUrl} target="_blank">
              {dashboardUrl}
            </a>{" "}
            (or use the &quot;Launch Visualizer&quot; button on the homepage).
          </p>

          <h2 id="user-interface">User Interface</h2>
          <p>
            The EVM Visualizer interface consists of several key components:
          </p>

          <h3>Main Canvas</h3>
          <p>
            The central area displays an interactive graph of EVM components and
            their relationships. You can:
          </p>
          <ul>
            <li>Click and drag nodes to rearrange them</li>
            <li>
              Zoom in and out using the mouse wheel or the controls in the
              top-right corner
            </li>
            <li>
              Click on any component to view detailed information about it
            </li>
          </ul>

          <h3>Control Panel</h3>
          <p>
            Located at the bottom of the screen, the control panel allows you
            to:
          </p>
          <ul>
            <li>Start/pause the execution simulation</li>
            <li>Step forward or backward through the execution</li>
            <li>Reset the simulation to its initial state</li>
            <li>Adjust the execution speed</li>
          </ul>

          <h3>Detail Panels</h3>
          <p>
            The right sidebar contains detailed information about various EVM
            components:
          </p>
          <ul>
            <li>
              <strong>Transaction</strong>: Details about the current
              transaction being executed
            </li>
            <li>
              <strong>Stack</strong>: The current state of the EVM stack
            </li>
            <li>
              <strong>Memory</strong>: The current state of the EVM memory
            </li>
            <li>
              <strong>Storage</strong>: The current state of the contract&quot;s
              storage
            </li>
            <li>
              <strong>World State</strong>: The global state of the blockchain
            </li>
            <li>
              <strong>Execution</strong>: Information about the current
              execution context
            </li>
            <li>
              <strong>Bytecode</strong>: The raw and disassembled bytecode being
              executed
            </li>
          </ul>

          <div className="not-prose">
            <HeroDemo />
          </div>

          <h2 id="using-the-visualizer">Using the Visualizer</h2>

          <h3>Exploring a Pre-defined Scenario</h3>
          <p>
            The EVM Visualizer comes with several pre-defined scenarios that
            demonstrate different aspects of EVM execution:
          </p>
          <ol>
            <li>
              Launch the visualizer by clicking the &quot;Launch
              Visualizer&quot; button on the homepage
            </li>
            <li>The default scenario will load automatically</li>
            <li>
              Use the control panel at the bottom to step through the execution
            </li>
            <li>Click on different components to view detailed information</li>
            <li>
              To load a different scenario, use the &quot;Settings&quot; button
              and select from the available options
            </li>
          </ol>

          <h3>Loading a Custom Transaction</h3>
          <p>You can also visualize your own custom transactions:</p>
          <ol>
            <li>
              Click the &quot;Settings&quot; button in the top-right corner
            </li>
            <li>
              In the settings panel, select &quot;Load Custom Transaction&quot;
            </li>
            <li>
              Enter the transaction details (from address, to address, value,
              gas limit, etc.)
            </li>
            <li>
              If you&quot;re visualizing a contract interaction, paste the
              contract bytecode or ABI
            </li>
            <li>
              Click &quot;Load Transaction&quot; to start the visualization
            </li>
          </ol>

          <h3>Keyboard Shortcuts</h3>
          <p>
            The EVM Visualizer supports several keyboard shortcuts for easier
            navigation:
          </p>
          <ul>
            <li>
              <strong>Space</strong>: Play/pause execution
            </li>
            <li>
              <strong>Right Arrow</strong>: Step forward
            </li>
            <li>
              <strong>Left Arrow</strong>: Step backward
            </li>
            <li>
              <strong>R</strong>: Reset simulation
            </li>
            <li>
              <strong>F</strong>: Fit view to screen
            </li>
            <li>
              <strong>Esc</strong>: Close dialogs
            </li>
          </ul>

          <h2 id="example-walkthrough">Example Walkthrough</h2>
          <p>
            Let&quot;s walk through a simple example of visualizing a basic
            Ethereum transaction:
          </p>
          <ol>
            <li>Launch the EVM Visualizer</li>
            <li>
              The default scenario shows a simple value transfer transaction
            </li>
            <li>
              Click the &quot;Play&quot; button to start the simulation, or use
              the &quot;Step Forward&quot; button to proceed step by step
            </li>
            <li>
              Observe how the transaction flows through the EVM:
              <ul>
                <li>
                  First, the transaction is validated and added to the execution
                  queue
                </li>
                <li>
                  The EVM initializes the execution context with the transaction
                  data
                </li>
                <li>
                  The value is transferred from the sender to the recipient
                </li>
                <li>The world state is updated to reflect the new balances</li>
              </ul>
            </li>
            <li>
              Click on different components (Transaction, World State, etc.) to
              view detailed information about their current state
            </li>
            <li>
              Use the &quot;Reset&quot; button to start over, or load a
              different scenario to explore other aspects of EVM execution
            </li>
          </ol>

          <h2 id="next-steps">Next Steps</h2>
          <p>
            Now that you&quot;re familiar with the basic usage of the EVM
            Visualizer, you can explore more advanced topics:
          </p>

          <ul>
            <li>
              <Link
                href="/docs/core-concepts"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Core Concepts
              </Link>{" "}
              - Learn about the key components of the EVM
            </li>
            <li>
              <Link
                href="/docs/examples/basic-transactions"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Example Scenarios
              </Link>{" "}
              - Explore pre-configured examples of different transaction types
            </li>
            <li>
              <Link
                href="/docs/reference/opcodes"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Opcode Reference
              </Link>{" "}
              - Detailed documentation of all EVM opcodes
            </li>
          </ul>

          <div className="not-prose mt-10 flex items-center justify-between">
            <Button asChild variant="outline">
              <Link href="/docs">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Docs
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs/core-concepts">
                Next: Core Concepts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
