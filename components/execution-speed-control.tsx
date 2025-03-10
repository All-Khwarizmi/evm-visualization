"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Gauge, Zap } from "lucide-react"

interface ExecutionSpeedControlProps {
  onSpeedChange: (speedMs: number) => void
}

export function ExecutionSpeedControl({ onSpeedChange }: ExecutionSpeedControlProps) {
  const [speed, setSpeed] = useState(1000) // Default 1000ms (1 second)

  const handleSpeedChange = (value: number[]) => {
    const newSpeed = value[0]
    setSpeed(newSpeed)
    onSpeedChange(newSpeed)
  }

  // Predefined speed presets
  const setSpeedPreset = (presetSpeed: number) => {
    setSpeed(presetSpeed)
    onSpeedChange(presetSpeed)
  }

  return (
    <div className="flex items-center gap-3">
      <Gauge className="h-4 w-4 text-slate-500" />
      <div className="flex-1">
        <Slider value={[speed]} min={100} max={2000} step={100} onValueChange={handleSpeedChange} />
      </div>
      <div className="flex gap-1">
        <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setSpeedPreset(2000)}>
          Slow
        </Button>
        <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setSpeedPreset(1000)}>
          Normal
        </Button>
        <Button variant="outline" size="sm" className="h-7 px-2" onClick={() => setSpeedPreset(300)}>
          <Zap className="h-3 w-3 mr-1" />
          Fast
        </Button>
      </div>
    </div>
  )
}

