import type { EVMTransaction, EVMWorldState } from "@/types/evm"

export interface EVMStep {
  description: string
  opcodes: string[]
  stack: string[]
  memory: string
  storage: Record<string, string>
  worldState?: Partial<EVMWorldState>
  gasUsed?: number
  gasRemaining?: number
}

export interface EVMScenario {
  name: string
  description: string
  transaction: EVMTransaction
  steps: EVMStep[]
  category?: "basic" | "tokens" | "defi" | "security" | "other"
  author?: string
  tags?: string[]
  complexity?: "beginner" | "intermediate" | "advanced"
}


