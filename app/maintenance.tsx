import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Wrench } from "lucide-react"

export default function Maintenance() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center mb-6">
          <Wrench className="h-8 w-8 text-amber-600 dark:text-amber-400" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Under Maintenance</h1>
        <p className="text-lg text-muted-foreground mb-8">
          We're currently performing scheduled maintenance on our servers. We'll be back shortly!
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Expected completion: <span className="font-medium">March 12, 2025 at 6:00 PM UTC</span>
        </p>
        <Button asChild>
          <Link href="/">Check Status</Link>
        </Button>
      </div>
    </div>
  )
}

