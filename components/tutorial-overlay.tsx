"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronRight, ChevronLeft, X } from "lucide-react"

interface TutorialStep {
  title: string
  description: string
  targetElement: string
  position: "top" | "right" | "bottom" | "left"
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Transaction",
    description:
      "This is where the transaction data is stored. It contains the sender, recipient, value, and data for execution.",
    targetElement: "[data-node-id='transaction']",
    position: "bottom",
  },
  {
    title: "Opcode Execution",
    description:
      "The EVM executes bytecode one instruction (opcode) at a time. Each opcode performs a specific operation.",
    targetElement: "[data-node-id='opcode']",
    position: "right",
  },
  {
    title: "Stack",
    description: "The stack is a last-in-first-out (LIFO) data structure that stores values for operations.",
    targetElement: "[data-node-id='stack']",
    position: "right",
  },
  {
    title: "Memory",
    description: "Memory is a temporary byte-addressable storage that exists during execution.",
    targetElement: "[data-node-id='memory']",
    position: "left",
  },
  {
    title: "Storage",
    description: "Storage is persistent and remains after execution. It's where contract state is stored.",
    targetElement: "[data-node-id='storage']",
    position: "left",
  },
  {
    title: "World State",
    description: "The world state contains all accounts and their states on the blockchain.",
    targetElement: "[data-node-id='worldState']",
    position: "top",
  },
  {
    title: "Execution Controls",
    description: "Use these controls to step through the execution process one instruction at a time.",
    targetElement: ".control-panel",
    position: "top",
  },
]

export function TutorialOverlay() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const startTutorial = () => {
    setCurrentStep(0)
    setIsVisible(true)
  }

  const endTutorial = () => {
    setIsVisible(false)
  }

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      endTutorial()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    if (!isVisible) return

    const step = tutorialSteps[currentStep]
    const targetElement = document.querySelector(step.targetElement)

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      let top = 0
      let left = 0

      switch (step.position) {
        case "top":
          top = rect.top - 120
          left = rect.left + rect.width / 2 - 150
          break
        case "right":
          top = rect.top + rect.height / 2 - 60
          left = rect.right + 20
          break
        case "bottom":
          top = rect.bottom + 20
          left = rect.left + rect.width / 2 - 150
          break
        case "left":
          top = rect.top + rect.height / 2 - 60
          left = rect.left - 320
          break
      }

      // Ensure the tooltip stays within viewport
      if (left < 20) left = 20
      if (left > window.innerWidth - 320) left = window.innerWidth - 320
      if (top < 20) top = 20
      if (top > window.innerHeight - 120) top = window.innerHeight - 120

      setPosition({ top, left })
    }
  }, [currentStep, isVisible])

  if (!isVisible) {
    return (
      <Button variant="outline" size="sm" className="fixed bottom-4 right-4 z-50" onClick={startTutorial}>
        Start Tutorial
      </Button>
    )
  }

  const step = tutorialSteps[currentStep]

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={endTutorial} />

      <Card className="fixed z-50 w-80 p-4 shadow-lg" style={{ top: `${position.top}px`, left: `${position.left}px` }}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-lg">{step.title}</h3>
          <Button variant="ghost" size="icon" onClick={endTutorial}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm mb-4">{step.description}</p>

        <div className="flex justify-between">
          <Button variant="outline" size="sm" onClick={prevStep} disabled={currentStep === 0}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>

          <div className="text-xs text-slate-500">
            {currentStep + 1} / {tutorialSteps.length}
          </div>

          <Button variant="outline" size="sm" onClick={nextStep}>
            {currentStep < tutorialSteps.length - 1 ? (
              <>
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </>
            ) : (
              "Finish"
            )}
          </Button>
        </div>
      </Card>
    </>
  )
}

