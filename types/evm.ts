export interface EVMTransaction {
  from: string
  to: string
  value: string
  gasLimit: number
  gasPrice: number
  data: string
  nonce: number
}

export interface EVMStack {
  items: string[]
}

export interface EVMMemory {
  data: string
  size: number
  preview: string
}

export interface EVMStorage {
  slots: Record<string, string>
}

export interface EVMAccount {
  balance: string
  nonce: number
  codeHash: string
  storageRoot: string
}

export interface EVMWorldState {
  accounts: Record<string, EVMAccount>
}

