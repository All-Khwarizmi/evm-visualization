"use client"

import EVMVisualizationDashboard from "@/components/evm-visualization-dashboard"

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-1 overflow-hidden">
        <EVMVisualizationDashboard />
      </main>
    </div>
  )
}

