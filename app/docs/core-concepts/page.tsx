"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function CoreConceptsPage() {
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
          <span>Core Concepts</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight mb-6">
          EVM Core Concepts
        </h1>

        <div className="prose dark:prose-invert max-w-none mb-10">
          <p className="lead text-xl text-slate-600 dark:text-slate-400">
            Understanding the key components and concepts of the Ethereum
            Virtual Machine (EVM) is essential for developing and debugging
            smart contracts.
          </p>

          <h2 id="what-is-evm">What is the EVM?</h2>
          <p>
            The Ethereum Virtual Machine (EVM) is a Turing-complete, stack-based
            virtual machine that executes smart contract bytecode. It&apos;s the
            runtime environment for all smart contracts on the Ethereum
            blockchain and EVM-compatible chains.
          </p>

          <p>
            The EVM is designed to be deterministic, meaning that given the same
            input and state, it will always produce the same output. This
            property is crucial for consensus across the network.
          </p>

          <h2 id="transactions">Transactions and Execution</h2>
          <p>
            Transactions are the fundamental unit of state change in Ethereum.
            When a transaction is submitted to the network, it triggers the
            execution of code in the EVM. There are two types of transactions:
          </p>

          <ul>
            <li>
              <strong>Message Calls</strong>: Transactions that call functions
              on existing contracts.
            </li>
            <li>
              <strong>Contract Creation</strong>: Transactions that deploy new
              contracts to the blockchain.
            </li>
          </ul>

          <div className="not-prose">
            <Card className="mb-6">
              <CardContent className="p-4">
                <img
                  src="/placeholder.svg?height=300&width=800"
                  alt="Transaction Execution Flow"
                  className="w-full rounded-md"
                />
              </CardContent>
            </Card>
          </div>

          <h2 id="execution-context">Execution Context</h2>
          <p>
            When a transaction is executed, the EVM creates an execution context
            that includes:
          </p>

          <ul>
            <li>
              <strong>Code</strong>: The bytecode to be executed.
            </li>
            <li>
              <strong>Program Counter (PC)</strong>: Points to the current
              instruction in the bytecode.
            </li>
            <li>
              <strong>Stack</strong>: A last-in, first-out data structure for
              operation arguments and results.
            </li>
            <li>
              <strong>Memory</strong>: Volatile, byte-addressable memory for
              temporary storage.
            </li>
            <li>
              <strong>Storage</strong>: Persistent key-value store for contract
              state.
            </li>
            <li>
              <strong>Gas Remaining</strong>: The amount of gas available for
              execution.
            </li>
          </ul>

          <h2 id="stack">Stack</h2>
          <p>
            The EVM is a stack-based machine, meaning that most operations take
            their arguments from the stack and push their results back onto it.
            The stack has a maximum depth of 1024 items, and each item is 256
            bits (32 bytes) wide.
          </p>

          <p>Common stack operations include:</p>

          <ul>
            <li>
              <strong>PUSH1-32</strong>: Push a value onto the stack.
            </li>
            <li>
              <strong>POP</strong>: Remove the top item from the stack.
            </li>
            <li>
              <strong>DUP1-16</strong>: Duplicate a stack item.
            </li>
            <li>
              <strong>SWAP1-16</strong>: Swap stack items.
            </li>
          </ul>

          <h2 id="memory">Memory</h2>
          <p>
            Memory is a volatile, byte-addressable space that exists only during
            contract execution. It&apos;s used for temporary storage and is wiped
            after execution completes. Memory can be accessed in 32-byte chunks
            using MLOAD and MSTORE operations.
          </p>

          <p>
            Memory expansion is not free—it costs gas. The cost increases
            quadratically as more memory is used, which encourages efficient
            memory usage.
          </p>

          <h2 id="storage">Storage</h2>
          <p>
            Storage is persistent and remains after execution. It&apos;s a key-value
            store where both keys and values are 256 bits wide. Storage is
            expensive to use (in terms of gas) but necessary for maintaining
            state between transactions.
          </p>

          <p>Storage operations include:</p>

          <ul>
            <li>
              <strong>SLOAD</strong>: Load a value from storage.
            </li>
            <li>
              <strong>SSTORE</strong>: Store a value in storage.
            </li>
          </ul>

          <h2 id="gas">Gas and Execution Costs</h2>
          <p>
            Gas is a measure of computational effort in the EVM. Every operation
            consumes a specific amount of gas, and transactions must specify a
            gas limit—the maximum amount of gas they&apos;re willing to consume.
          </p>

          <p>Gas serves two primary purposes:</p>

          <ol>
            <li>It prevents infinite loops and denial-of-service attacks.</li>
            <li>
              It compensates miners/validators for the computational resources
              they provide.
            </li>
          </ol>

          <p>Gas costs vary by operation:</p>

          <ul>
            <li>
              <strong>Basic operations</strong> (ADD, SUB, etc.): 3-5 gas
            </li>
            <li>
              <strong>Memory operations</strong> (MLOAD, MSTORE): 3 gas + memory
              expansion cost
            </li>
            <li>
              <strong>Storage operations</strong> (SLOAD, SSTORE): 200-20,000
              gas, depending on the operation
            </li>
            <li>
              <strong>External calls</strong> (CALL, DELEGATECALL): 100-700 gas
              + memory expansion cost
            </li>
          </ul>

          <h2 id="world-state">World State</h2>
          <p>
            The world state is a mapping between addresses and account states.
            Each account state includes:
          </p>

          <ul>
            <li>
              <strong>Balance</strong>: The amount of Ether owned by the
              account.
            </li>
            <li>
              <strong>Nonce</strong>: A counter used to ensure each transaction
              is processed only once.
            </li>
            <li>
              <strong>Code Hash</strong>: The hash of the account&apos;s code (empty
              for EOAs).
            </li>
            <li>
              <strong>Storage Root</strong>: The root hash of the account&apos;s
              storage trie.
            </li>
          </ul>

          <p>There are two types of accounts in Ethereum:</p>

          <ul>
            <li>
              <strong>Externally Owned Accounts (EOAs)</strong>: Controlled by
              private keys, can initiate transactions.
            </li>
            <li>
              <strong>Contract Accounts</strong>: Controlled by code, can only
              execute when called by an EOA or another contract.
            </li>
          </ul>

          <h2 id="next-steps">Next Steps</h2>
          <p>
            Now that you understand the core concepts of the EVM, you can
            explore more advanced topics:
          </p>

          <ul>
            <li>
              <Link
                href="/docs/advanced-usage"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Advanced Usage
              </Link>{" "}
              - Learn about more complex EVM features and interactions.
            </li>
            <li>
              <Link
                href="/docs/reference/opcodes"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Opcode Reference
              </Link>{" "}
              - Detailed documentation of all EVM opcodes.
            </li>
            <li>
              <Link
                href="/docs/examples/basic-transactions"
                className="text-purple-600 dark:text-purple-400 hover:underline"
              >
                Basic Transaction Examples
              </Link>{" "}
              - See the EVM in action with simple examples.
            </li>
          </ul>

          <div className="not-prose mt-10 flex items-center justify-between">
            <Button asChild variant="outline">
              <Link href="/docs/getting-started">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous: Getting Started
              </Link>
            </Button>
            <Button asChild>
              <Link href="/docs/advanced-usage">
                Next: Advanced Usage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

