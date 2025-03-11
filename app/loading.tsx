export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <h2 className="text-xl font-semibold mt-4">Loading...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your content</p>
      </div>
    </div>
  )
}

