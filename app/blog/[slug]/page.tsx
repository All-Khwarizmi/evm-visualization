"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react"
import Link from "next/link"

// This is a placeholder component for a blog post page
// In a real application, you would fetch the blog post data based on the slug
export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // Sample blog post data
  const post = {
    id: params.slug,
    title: "Understanding EVM Execution: A Deep Dive",
    content: `
      <p>The Ethereum Virtual Machine (EVM) is the runtime environment for smart contracts in Ethereum. It's a Turing-complete, stack-based virtual machine that executes bytecode. Understanding how the EVM works is crucial for developing efficient and secure smart contracts.</p>
      
      <h2>The EVM Execution Model</h2>
      
      <p>When a transaction triggers a smart contract, the EVM executes the contract's bytecode. The execution follows these steps:</p>
      
      <ol>
        <li>The transaction is validated and added to a block.</li>
        <li>The EVM initializes the execution context with the transaction data.</li>
        <li>The bytecode is executed one instruction at a time.</li>
        <li>Each instruction manipulates the EVM state (stack, memory, storage).</li>
        <li>Gas is consumed for each operation.</li>
        <li>The execution continues until it completes, runs out of gas, or encounters an error.</li>
      </ol>
      
      <h2>EVM Components</h2>
      
      <p>The EVM has several key components that work together during execution:</p>
      
      <h3>Stack</h3>
      
      <p>The EVM is a stack-based machine, meaning most operations take their arguments from the stack and push their results back onto it. The stack has a maximum depth of 1024 items, and each item is 256 bits (32 bytes) wide.</p>
      
      <h3>Memory</h3>
      
      <p>Memory is a volatile, byte-addressable space that exists only during contract execution. It's used for temporary storage and is wiped after execution completes. Memory can be accessed in 32-byte chunks using MLOAD and MSTORE operations.</p>
      
      <h3>Storage</h3>
      
      <p>Storage is persistent and remains after execution. It's a key-value store where both keys and values are 256 bits wide. Storage is expensive to use (in terms of gas) but necessary for maintaining state between transactions.</p>
      
      <h3>Calldata</h3>
      
      <p>Calldata contains the input data for the transaction, including the function selector and arguments. It's read-only and cheaper to access than memory.</p>
      
      <h2>Gas and Execution Costs</h2>
      
      <p>Every operation in the EVM consumes gas, which is a measure of computational effort. Gas serves two purposes:</p>
      
      <ol>
        <li>It prevents infinite loops and denial-of-service attacks.</li>
        <li>It compensates miners/validators for the computational resources they provide.</li>
      </ol>
      
      <p>Different operations have different gas costs. For example:</p>
      
      <ul>
        <li>ADD: 3 gas</li>
        <li>SSTORE (writing to storage): 20,000 gas (for a 0 to non-0 write)</li>
        <li>CALL (message call): at least 700 gas, plus memory expansion costs</li>
      </ul>
      
      <h2>Visualizing EVM Execution</h2>
      
      <p>The EVM Visualizer tool helps you understand these concepts by providing a visual representation of the execution process. You can see how the stack, memory, and storage change with each instruction, and how gas is consumed throughout the execution.</p>
      
      <p>In the next article, we'll explore specific examples of EVM execution and how to use the visualizer to debug and optimize your smart contracts.</p>
    `,
    author: "Alex Johnson",
    date: "2023-05-15",
    readTime: "8 min read",
    tags: ["EVM", "Smart Contracts", "Ethereum"],
    category: "technical",
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Button asChild variant="outline" size="sm">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>

        <article>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {post.author}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {post.date}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <div key={tag} className="flex items-center text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">
                  <Link
                    href="/blog/gas-optimization-techniques"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Advanced Gas Optimization Techniques for Smart Contracts
                  </Link>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Learn how to optimize your smart contracts to reduce gas costs and improve efficiency.
                </p>
              </div>
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">
                  <Link
                    href="/blog/debugging-smart-contracts"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Debugging Smart Contracts with EVM Visualizer
                  </Link>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Learn how to use the EVM Visualizer to debug and understand complex smart contract interactions.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

