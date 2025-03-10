"use client"

import { useState, useEffect, useCallback } from "react"
import type { EVMTransaction, EVMStack, EVMMemory, EVMStorage, EVMWorldState } from "@/types/evm"
import type { EVMScenario } from "@/types/scenarios"

// Default scenario for backward compatibility
const defaultScenario: EVMScenario = {
  name: "Simple Value Transfer",
  description: "Basic ETH transfer between two accounts",
  transaction: {
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1234567890123456789012345678901234567890",
    value: "0.1",
    gasLimit: 21000,
    gasPrice: 20,
    data: "0x608060405234801561001057600080fd5b5060f78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063771602f714602d575b600080fd5b605660048036036040811015604157600080fd5b8101908080359060200190929190803590602001909291905050506058565b005b8082016000819055505056fea2646970667358221220c8daade51f385271f21c2b8e19adf4e2bbe5730a152e3603762723a0d7f3f05364736f6c634300060c0033",
    nonce: 5,
  },
  steps: [
    {
      description: "Ready to start execution",
      opcodes: [],
      stack: [],
      memory: "",
      storage: {},
    },
    {
      description: "Transaction initiated, pushing value to stack",
      opcodes: ["PUSH1 0x60"],
      stack: ["0x0000000000000000000000000000000000000000000000000000000000000060"],
      memory: "",
      storage: {},
    },
    {
      description: "Second value pushed to stack",
      opcodes: ["PUSH1 0x40"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
      ],
      memory: "",
      storage: {},
    },
    {
      description: "Storing value from stack to memory",
      opcodes: ["MSTORE"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      ],
      memory: "0x0000000000000000000000000000000000000000000000000000000000000060",
      storage: {},
    },
    {
      description: "Reading transaction value",
      opcodes: ["CALLVALUE"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      ],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {},
    },
    {
      description: "Conditional check on stack",
      opcodes: ["ISZERO"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      ],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {},
    },
    {
      description: "Storing value to persistent storage",
      opcodes: ["SSTORE"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
      ],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0": "0x0000000000000000000000000000000000000000000000000000000000000060",
      },
    },
    {
      description: "Updating world state with new values",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0": "0x0000000000000000000000000000000000000000000000000000000000000060",
      },
    },
    {
      description: "Additional storage update",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0": "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x1": "0x0000000000000000000000000000000000000000000000000000000000000040",
      },
    },
    {
      description: "Finalizing transaction, transferring value",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0": "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x1": "0x0000000000000000000000000000000000000000000000000000000000000040",
      },
    },
    {
      description: "Transaction completed, state committed",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0": "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x1": "0x0000000000000000000000000000000000000000000000000000000000000040",
      },
    },
  ],
}

// Initial state values
const initialStack: EVMStack = {
  items: [],
}

const initialMemory: EVMMemory = {
  data: "",
  size: 0,
  preview: "0x",
}

const initialStorage: EVMStorage = {
  slots: {},
}

const initialWorldState: EVMWorldState = {
  accounts: {
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e": {
      balance: "10.0",
      nonce: 5,
      codeHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      storageRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    },
    "0x1234567890123456789012345678901234567890": {
      balance: "5.0",
      nonce: 0,
      codeHash: "0x0000000000000000000000000000000000000000000000000000000000000000",
      storageRoot: "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    },
  },
}

export function useEVMSimulation(scenario?: EVMScenario) {
  const [currentScenario, setCurrentScenario] = useState<EVMScenario>(scenario || defaultScenario)
  const [currentStep, setCurrentStep] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [transaction, setTransaction] = useState<EVMTransaction>(currentScenario.transaction)
  const [stack, setStack] = useState<EVMStack>(initialStack)
  const [memory, setMemory] = useState<EVMMemory>(initialMemory)
  const [storage, setStorage] = useState<EVMStorage>(initialStorage)
  const [worldState, setWorldState] = useState<EVMWorldState>(initialWorldState)
  const [currentOpcode, setCurrentOpcode] = useState<string>("")
  const [gasUsed, setGasUsed] = useState(0)
  const [gasRemaining, setGasRemaining] = useState(currentScenario.transaction.gasLimit)
  const [executionInterval, setExecutionInterval] = useState(1000) // Default 1 second

  // Total steps in the simulation
  const totalSteps = currentScenario.steps.length - 1

  // Load a new scenario
  const loadScenario = useCallback((newScenario: EVMScenario) => {
    setCurrentScenario(newScenario)
    setTransaction(newScenario.transaction)
    setGasRemaining(newScenario.transaction.gasLimit)
    resetSimulation()
  }, [])

  // Simulation steps with more granular control
  const simulateStep = useCallback(
    (step: number) => {
      if (step < 0 || step > totalSteps) return

      const currentStepData = currentScenario.steps[step]

      // Set current opcode
      if (currentStepData.opcodes && currentStepData.opcodes.length > 0) {
        setCurrentOpcode(currentStepData.opcodes[0])
      } else {
        setCurrentOpcode("")
      }

      // Update gas
      const stepGasUsed = currentStepData.gasUsed || step * 3
      setGasUsed(stepGasUsed)
      setGasRemaining(transaction.gasLimit - stepGasUsed)

      // Update stack
      if (currentStepData.stack) {
        setStack({
          items: currentStepData.stack,
        })
      } else {
        setStack(initialStack)
      }

      // Update memory
      if (currentStepData.memory) {
        setMemory({
          data: currentStepData.memory,
          size: currentStepData.memory.length / 2 - 1, // Rough estimate
          preview:
            currentStepData.memory.length > 20
              ? `${currentStepData.memory.substring(0, 10)}...${currentStepData.memory.substring(currentStepData.memory.length - 10)}`
              : currentStepData.memory,
        })
      } else {
        setMemory(initialMemory)
      }

      // Update storage
      if (currentStepData.storage) {
        setStorage({
          slots: currentStepData.storage,
        })
      } else {
        setStorage(initialStorage)
      }

      // Update world state
      if (currentStepData.worldState) {
        setWorldState((prev) => ({
          ...prev,
          ...currentStepData.worldState,
        }))
      } else if (step >= 7) {
        // Legacy behavior for backward compatibility
        const updatedAccounts = { ...initialWorldState.accounts }

        // Update sender balance (gas cost)
        const senderBalance = Number.parseFloat(updatedAccounts[transaction.from].balance)
        updatedAccounts[transaction.from] = {
          ...updatedAccounts[transaction.from],
          balance: (senderBalance - step * 0.001).toFixed(3),
          nonce: updatedAccounts[transaction.from].nonce + (step >= 10 ? 1 : 0),
        }

        // Update recipient balance (value transfer)
        if (step >= 9) {
          const recipientBalance = Number.parseFloat(updatedAccounts[transaction.to].balance)
          const transferAmount = Number.parseFloat(transaction.value)
          updatedAccounts[transaction.to] = {
            ...updatedAccounts[transaction.to],
            balance: (recipientBalance + transferAmount).toFixed(3),
          }
        }

        setWorldState({
          accounts: updatedAccounts,
        })
      } else {
        setWorldState(initialWorldState)
      }
    },
    [currentScenario, totalSteps, transaction],
  )

  // Reset simulation when transaction changes
  useEffect(() => {
    resetSimulation()
  }, [transaction])

  // Start simulation
  const startSimulation = useCallback(() => {
    setIsRunning(true)
  }, [])

  // Pause simulation
  const pauseSimulation = useCallback(() => {
    setIsRunning(false)
  }, [])

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setCurrentStep(0)
    setIsRunning(false)
    setStack(initialStack)
    setMemory(initialMemory)
    setStorage(initialStorage)
    setWorldState(initialWorldState)
    setCurrentOpcode("")
    setGasUsed(0)
    setGasRemaining(transaction.gasLimit)
  }, [transaction.gasLimit])

  // Step forward
  const stepForward = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }, [currentStep, totalSteps])

  // Step backward
  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }, [currentStep])

  // Run simulation when isRunning is true
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < totalSteps) {
            return prev + 1
          } else {
            setIsRunning(false)
            return prev
          }
        })
      }, executionInterval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, totalSteps, executionInterval])

  // Update state based on current step
  useEffect(() => {
    simulateStep(currentStep)
  }, [currentStep, simulateStep])

  return {
    currentStep,
    totalSteps,
    isRunning,
    transaction,
    stack,
    memory,
    storage,
    worldState,
    currentOpcode,
    gasUsed,
    gasRemaining,
    startSimulation,
    pauseSimulation,
    resetSimulation,
    stepForward,
    stepBackward,
    setTransaction,
    setExecutionInterval,
    loadScenario,
    currentScenario,
  }
}

