"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">Critical Error</h1>
            <p className="text-lg mb-8">We've encountered a critical error. Please try refreshing the page.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset}>Refresh Page</Button>
              <Button variant="outline" asChild>
                <Link href="/">Return Home</Link>
              </Button>
            </div>
            {error.digest && <p className="mt-8 text-xs text-muted-foreground">Error ID: {error.digest}</p>}
          </div>
        </div>
      </body>
    </html>
  )
}

