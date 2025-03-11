import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, Tag, User } from "lucide-react";
import Link from "next/link";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const id = await params.slug;
  const post = {
    id,
    title:
      "Introducing EVM Visualizer: Making Ethereum's Virtual Machine Visible",
    content: `
      <p>The Ethereum Virtual Machine (EVM) is the computational engine that powers all Ethereum smart contracts and transactions. Despite its critical importance, the EVM has remained largely invisible to developers and users alike—a black box that executes code but offers little insight into how that execution happens. Today, we're changing that with the launch of EVM Visualizer, an interactive tool that lets you see inside this black box.</p>
      
      <h2>Why We Built EVM Visualizer</h2>
      
      <p>Learning how the EVM works can be challenging. Documentation exists, but reading about abstract concepts like "stack-based execution" or "storage slots" isn't the same as seeing them in action. As developers, we found ourselves wishing for a tool that would show us exactly what happens when a transaction is processed by the EVM.</p>
      
      <p>That's why we created EVM Visualizer—to transform abstract concepts into tangible, visual experiences that anyone can understand.</p>
      
      <h2>How It Works</h2>
      
      <p>EVM Visualizer renders the key components of the Ethereum Virtual Machine as interactive nodes on a canvas:</p>
      
      <ul>
        <li><strong>Transaction</strong> - The input that triggers execution</li>
        <li><strong>Stack</strong> - The Last-In-First-Out data structure used for operations</li>
        <li><strong>Memory</strong> - Temporary storage that exists only during execution</li>
        <li><strong>Storage</strong> - Persistent data that remains after execution</li>
        <li><strong>World State</strong> - The global state of the blockchain</li>
      </ul>
      
      <p>When you step through a transaction, you can see how data flows between these components, how each opcode affects them, and how gas is consumed at each step. You can pause, rewind, and control the execution speed to understand even the most complex interactions.</p>
      
      <h2>Built with AI Assistance</h2>
      
      <p>One of the most interesting aspects of developing EVM Visualizer was our approach. We used a technique sometimes called "vibe coding"—using AI tools like Claude to assist with the coding process through iterative prompting and refinement.</p>
      
      <p>This approach allowed us to:</p>
      <ul>
        <li>Rapidly prototype complex visualizations</li>
        <li>Generate boilerplate code for repetitive components</li>
        <li>Refine the UI through iterative feedback loops</li>
        <li>Focus more on the educational aspects and less on implementation details</li>
      </ul>
      
      <p>While AI didn't build the entire application, it significantly accelerated our development process and helped us generate creative solutions to visualization challenges.</p>
      
      <h2>Learning with EVM Visualizer</h2>
      
      <p>The tool is designed with education in mind. Each component provides detailed information about its role in the EVM, and you can click on any element to learn more.</p>
      
      <p>Here are some key concepts you can explore:</p>
      
      <ol>
        <li><strong>Transaction Flow</strong> - See how a transaction initiates execution and eventually changes the blockchain state</li>
        <li><strong>Stack Operations</strong> - Watch values being pushed, popped, and manipulated on the stack</li>
        <li><strong>Memory vs. Storage</strong> - Understand the difference between ephemeral and persistent state</li>
        <li><strong>Gas Consumption</strong> - Visualize why some operations cost more gas than others</li>
        <li><strong>Bytecode Execution</strong> - Step through the raw bytecode and see how each instruction is processed</li>
      </ol>
      
      <p>For a complete guide on how to use the tool, check out our <a href="/docs/getting-started">Getting Started documentation</a>.</p>
      
      <h2>What's Next</h2>
      
      <p>This is just the beginning for EVM Visualizer. Our roadmap includes:</p>
      
      <ul>
        <li><strong>More Complex Scenarios</strong> - Adding examples for DeFi transactions, NFT minting, and more</li>
        <li><strong>Custom Scenario Builder</strong> - A UI for creating and sharing your own transaction visualizations</li>
        <li><strong>Contract Debugging Tools</strong> - Features specifically designed to help debug smart contract issues</li>
        <li><strong>Educational Content</strong> - More tutorials and guides on using the visualizer to learn Ethereum concepts</li>
      </ul>
      
      <h2>Join Us</h2>
      
      <p>EVM Visualizer is an open-source project, and we welcome contributions from the community. Whether you want to add features, fix bugs, create educational content, or suggest improvements, your help is appreciated.</p>
      
      <ul>
        <li><a href="https://github.com/All-Khwarizmi/evm-visualization">GitHub Repository</a></li>
        <li><a href="/docs">Documentation</a></li>
        <li><a href="https://github.com/All-Khwarizmi/evm-visualization/issues">Feature Requests & Bug Reports</a></li>
      </ul>
      
      <p>We're excited to see how developers, educators, and blockchain enthusiasts use this tool to deepen their understanding of Ethereum. Try out <a href="/">EVM Visualizer</a> today and start exploring the inner workings of the EVM!</p>
    `,
    author: "EVM Visualizer Team",
    date: "March 11, 2025",
    readTime: "6 min read",
    tags: ["EVM", "Ethereum", "Visualization", "Launch", "AI Coding"],
    category: "announcements",
  };

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
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
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
                <div
                  key={tag}
                  className="flex items-center text-xs bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </div>
              ))}
            </div>
          </header>

          <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">
                  <Link
                    href="/docs/core-concepts"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    EVM Core Concepts
                  </Link>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Learn about the key components and concepts of the Ethereum
                  Virtual Machine.
                </p>
              </div>
              <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-4">
                <h3 className="font-medium mb-2">
                  <Link
                    href="/docs/getting-started"
                    className="hover:text-purple-600 dark:hover:text-purple-400"
                  >
                    Getting Started with EVM Visualizer
                  </Link>
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  A beginner&apos;s guide to using the EVM Visualizer to
                  understand Ethereum transactions.
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
