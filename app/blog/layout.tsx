import type React from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight, Menu } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
        <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 mr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-purple-600 dark:text-purple-400"
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
            <Link href="/" className="transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              Home
            </Link>
            <Link href="/docs" className="transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              Documentation
            </Link>
            <Link
              href="/blog"
              className="text-purple-600 dark:text-purple-400 transition-colors hover:text-purple-700 dark:hover:text-purple-300"
            >
              Blog
            </Link>
            <Link href="/examples" className="transition-colors hover:text-purple-600 dark:hover:text-purple-400">
              Examples
            </Link>
          </nav>

          <div className="flex-1"></div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <Button asChild variant="default" size="sm" className="hidden md:flex">
              <Link href="/dashboard">
                Launch Visualizer
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-4">
                    <Link href="/" className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6 text-purple-600 dark:text-purple-400"
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
                      className="px-2 py-1 text-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Home
                    </Link>
                    <Link
                      href="/docs"
                      className="px-2 py-1 text-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Documentation
                    </Link>
                    <Link
                      href="/blog"
                      className="px-2 py-1 text-lg text-purple-600 dark:text-purple-400 transition-colors hover:text-purple-700 dark:hover:text-purple-300"
                    >
                      Blog
                    </Link>
                    <Link
                      href="/examples"
                      className="px-2 py-1 text-lg transition-colors hover:text-purple-600 dark:hover:text-purple-400"
                    >
                      Examples
                    </Link>
                  </nav>

                  <div className="mt-auto border-t border-slate-200 dark:border-slate-800 py-4">
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

      <div className="flex-1">{children}</div>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-6">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">
              © {new Date().getFullYear()} EVM Visualizer. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
              <Link
                href="/docs"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Documentation
              </Link>
              <Link
                href="/blog"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Blog
              </Link>
              <Link
                href="/examples"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                Examples
              </Link>
              <Link
                href="/github"
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

