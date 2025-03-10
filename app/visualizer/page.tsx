"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VisualizerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {/* Visualization Area */}
          <div className="relative aspect-square md:aspect-auto md:h-[calc(100vh-8rem)] bg-card rounded-lg border">
            {/* Your visualization canvas/component goes here */}
          </div>

          {/* Details Panel */}
          <div className="h-full">
            <Tabs defaultValue="transaction" className="h-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="transaction">Transaction</TabsTrigger>
                <TabsTrigger value="stack">Stack</TabsTrigger>
                <TabsTrigger value="memory">Memory</TabsTrigger>
                <TabsTrigger value="storage">Storage</TabsTrigger>
              </TabsList>

              <TabsContent value="transaction" className="h-[calc(100vh-12rem)]">
                <div className="p-4 rounded-lg bg-card border h-full">
                  <h2 className="text-lg font-semibold mb-2">Transaction Details</h2>
                  {/* Transaction details content */}
                </div>
              </TabsContent>

              <TabsContent value="stack" className="h-[calc(100vh-12rem)]">
                <div className="p-4 rounded-lg bg-card border h-full">
                  <h2 className="text-lg font-semibold mb-2">Stack</h2>
                  {/* Stack content */}
                </div>
              </TabsContent>

              <TabsContent value="memory" className="h-[calc(100vh-12rem)]">
                <div className="p-4 rounded-lg bg-card border h-full">
                  <h2 className="text-lg font-semibold mb-2">Memory</h2>
                  {/* Memory content */}
                </div>
              </TabsContent>

              <TabsContent value="storage" className="h-[calc(100vh-12rem)]">
                <div className="p-4 rounded-lg bg-card border h-full">
                  <h2 className="text-lg font-semibold mb-2">Storage</h2>
                  {/* Storage content */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

