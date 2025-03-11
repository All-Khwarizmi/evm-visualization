import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md text-center py-12">
          <h1 className="text-9xl font-bold text-primary/20">404</h1>
          <h2 className="text-2xl font-bold mt-4">Page Not Found</h2>
          <p className="text-muted-foreground mt-2 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/">Return Home</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/dashboard">Launch Visualizer</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

