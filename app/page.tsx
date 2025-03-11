"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Book,
  Code,
  Cpu,
  FileText,
  Layers,
  Rocket,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { HeroDemo } from "@/components/hero-demo";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950 text-white">
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="container w-full flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 mr-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-purple-500"
              >
                <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                <path d="M8 8H5a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z" />
                <path d="M19 8h-3a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z" />
                <path d="M12 16v4" />
                <path d="M8 20h8" />
                <path d="M12 12v4" />
              </svg>
              <span className="font-bold">EVM Visualizer</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/"
                className="text-purple-500 transition-colors hover:text-purple-400"
              >
                Home
              </Link>
              <Link
                href="/docs"
                className="text-slate-300 transition-colors hover:text-purple-400"
              >
                Documentation
              </Link>
              <Link
                href="/blog"
                className="text-slate-300 transition-colors hover:text-purple-400"
              >
                Blog
              </Link>
              <Link
                href="/examples"
                className="text-slate-300 transition-colors hover:text-purple-400"
              >
                Examples
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button
              asChild
              variant="default"
              size="sm"
              className="hidden md:flex"
            >
              <Link href="/dashboard">
                Launch Visualizer
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden border-slate-700"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[80%] sm:w-[350px] bg-slate-900 border-slate-800"
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-slate-800 py-4">
                    <Link href="/" className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-purple-500"
                      >
                        <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
                        <path d="M8 8H5a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z" />
                        <path d="M19 8h-3a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h3c.6 0 1-.4 1-1V9c0-.6-.4-1-1-1Z" />
                        <path d="M12 16v4" />
                        <path d="M8 20h8" />
                        <path d="M12 12v4" />
                      </svg>
                      <span className="font-bold">EVM Visualizer</span>
                    </Link>
                  </div>

                  <nav className="flex flex-col space-y-4 py-6">
                    <Link
                      href="/"
                      className="px-2 py-1 text-lg text-purple-500 transition-colors hover:text-purple-400"
                    >
                      Home
                    </Link>
                    <Link
                      href="/docs"
                      className="px-2 py-1 text-lg text-slate-300 transition-colors hover:text-purple-400"
                    >
                      Documentation
                    </Link>
                    <Link
                      href="/blog"
                      className="px-2 py-1 text-lg text-slate-300 transition-colors hover:text-purple-400"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/examples"
                      className="px-2 py-1 text-lg text-slate-300 transition-colors hover:text-purple-400"
                    >
                      Examples
                    </Link>
                  </nav>

                  <div className="mt-auto border-t border-slate-800 py-4">
                    <Button asChild variant="default" className="w-full">
                      <Link href="/dashboard">
                        Launch Visualizer
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Updated layout */}
        <section className="relative py-12 md:py-24 overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[80%] bg-purple-900/10 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-blue-900/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-[30%] left-[20%] w-[60%] h-[70%] bg-indigo-900/10 rounded-full blur-3xl"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02]"></div>
          </div>

          <div className="container px-4 md:px-6 mx-auto relative">
            {/* Content above demo */}
            <div className="max-w-3xl mx-auto text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-6">
                  Visualize the Ethereum Virtual Machine
                </h1>
                <p className="text-slate-300 md:text-xl mb-8">
                  An interactive tool to understand how the EVM executes smart
                  contracts, processes transactions, and manages state.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
                  >
                    <Link href="/dashboard">
                      Launch Visualizer
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-slate-900/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800"
                  >
                    <Link href="/examples">View Examples</Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Demo below content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <HeroDemo />
            </motion.div>
          </div>
        </section>

        {/* Features Section - Hexagonal Grid Layout */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50"></div>

          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                  Key Features
                </h2>
                <p className="max-w-[900px] text-slate-300 md:text-xl">
                  Explore the inner workings of the Ethereum Virtual Machine
                  with our interactive visualization tool.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="relative p-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-50 blur-[2px]"></div>
                <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                  <div className="w-12 h-12 rounded-lg bg-purple-900/50 flex items-center justify-center mb-4">
                    <Cpu className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Interactive Visualization
                  </h3>
                  <p className="text-slate-300">
                    See how transactions flow through the EVM with real-time,
                    interactive visualizations. Watch as data moves between
                    stack, memory, and storage during contract execution.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative p-1 md:mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-50 blur-[2px]"></div>
                <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                  <div className="w-12 h-12 rounded-lg bg-blue-900/50 flex items-center justify-center mb-4">
                    <Layers className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Step-by-Step Execution
                  </h3>
                  <p className="text-slate-300">
                    Walk through EVM operations one instruction at a time to
                    understand the execution flow. Understand how each opcode
                    affects the EVM state and how gas is consumed.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="relative p-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-50 blur-[2px]"></div>
                <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                  <div className="w-12 h-12 rounded-lg bg-indigo-900/50 flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Custom Scenarios</h3>
                  <p className="text-slate-300">
                    Create and visualize your own transaction scenarios for
                    educational or debugging purposes. Load custom transactions
                    and smart contracts to see how they execute.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Documentation Section - Diagonal Layout */}
        <section className="py-20 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-slate-950"></div>

          <div className="container px-4 md:px-6 mx-auto relative">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <motion.div
                className="lg:col-span-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-6">
                  Comprehensive Documentation
                </h2>
                <p className="text-slate-300 md:text-xl mb-8">
                  Explore our detailed guides, references, and examples to
                  deepen your understanding of the EVM.
                </p>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
                >
                  <Link href="/docs">
                    Browse Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative p-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-30 blur-[2px]"></div>
                    <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                      <Book className="h-8 w-8 text-purple-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Guides</h3>
                      <p className="text-slate-300 mb-4">
                        Step-by-step tutorials to help you get started with the
                        EVM Visualizer.
                      </p>
                      <Link
                        href="/docs/getting-started"
                        className="text-purple-400 hover:text-purple-300 inline-flex items-center"
                      >
                        Read Guides
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative p-1 sm:mt-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl opacity-30 blur-[2px]"></div>
                    <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                      <FileText className="h-8 w-8 text-blue-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Reference</h3>
                      <p className="text-slate-300 mb-4">
                        Detailed documentation of EVM opcodes, gas costs, and
                        architecture.
                      </p>
                      <Link
                        href="/docs/reference/opcodes"
                        className="text-blue-400 hover:text-blue-300 inline-flex items-center"
                      >
                        View Reference
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative p-1">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl opacity-30 blur-[2px]"></div>
                    <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                      <Rocket className="h-8 w-8 text-indigo-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Examples</h3>
                      <p className="text-slate-300 mb-4">
                        Real-world examples of EVM transactions and smart
                        contract executions.
                      </p>
                      <Link
                        href="/docs/examples/basic-transactions"
                        className="text-indigo-400 hover:text-indigo-300 inline-flex items-center"
                      >
                        Explore Examples
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="relative p-1 sm:mt-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl opacity-30 blur-[2px]"></div>
                    <div className="relative p-6 bg-slate-900/90 backdrop-blur-sm rounded-lg h-full border border-slate-800/50">
                      <Code className="h-8 w-8 text-cyan-400 mb-4" />
                      <h3 className="text-xl font-bold mb-2">
                        Developer Guide
                      </h3>
                      <p className="text-slate-300 mb-4">
                        Learn how to extend and customize the EVM Visualizer for
                        your own projects.
                      </p>
                      <Link
                        href="/docs/developer-guide"
                        className="text-cyan-400 hover:text-cyan-300 inline-flex items-center"
                      >
                        Read Developer Guide
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section - Floating Card Design */}
        <section className="py-20 relative">
          <div className="container px-4 md:px-6 mx-auto relative">
            <motion.div
              className="relative mx-auto max-w-4xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-30 blur-[8px]"></div>
              <div className="relative p-8 md:p-12 bg-slate-900/90 backdrop-blur-sm rounded-xl border border-slate-800/50 overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-purple-600/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-60 h-60 bg-indigo-600/10 rounded-full translate-x-1/3 translate-y-1/3"></div>

                <div className="relative text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200 mb-6">
                    Ready to Dive In?
                  </h2>
                  <p className="max-w-[600px] mx-auto text-slate-300 md:text-xl mb-8">
                    Start exploring the Ethereum Virtual Machine with our
                    interactive visualization tool.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      asChild
                      size="lg"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-0"
                    >
                      <Link href="/dashboard">
                        Launch Visualizer
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="bg-slate-900/50 backdrop-blur-sm border-slate-700 hover:bg-slate-800"
                    >
                      <Link href="/docs">Read the Docs</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} EVM Visualizer. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center items-center gap-6 text-sm">
              <Link
                href="/docs"
                className="text-slate-500 hover:text-slate-300"
              >
                Documentation
              </Link>
              <Link
                href="/blog"
                className="text-slate-500 hover:text-slate-300"
              >
                Blog
              </Link>

              <Link
                href="https://github.com/All-Khwarizmi/evm-visualization"
                className="text-slate-500 hover:text-slate-300"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
