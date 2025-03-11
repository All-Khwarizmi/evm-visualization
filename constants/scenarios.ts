import type {
  EVMTransaction,
  EVMStack,
  EVMMemory,
  EVMStorage,
  EVMWorldState,
} from "@/types/evm";
import type { EVMScenario } from "@/types/scenarios";

// Initial state values
export const initialStack: EVMStack = {
  items: [],
};

export const initialMemory: EVMMemory = {
  data: "",
  size: 0,
  preview: "0x",
};

export const initialStorage: EVMStorage = {
  slots: {},
};

export const initialWorldState: EVMWorldState = {
  accounts: {
    "0x742d35Cc6634C0532925a3b844Bc454e4438f44e": {
      balance: "10.0",
      nonce: 5,
      codeHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      storageRoot:
        "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    },
    "0x1234567890123456789012345678901234567890": {
      balance: "5.0",
      nonce: 0,
      codeHash:
        "0x0000000000000000000000000000000000000000000000000000000000000000",
      storageRoot:
        "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    },
  },
};

// Default scenario with improved educational descriptions
export const defaultScenario: EVMScenario = {
  name: "Simple Ethereum Transfer",
  description:
    "This scenario demonstrates a basic ETH transfer between two accounts, showing how the EVM processes simple transactions.",
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
      description:
        "The transaction is ready to begin execution. In this initial state, the EVM prepares to process a request to transfer 0.1 ETH from one account to another. The transaction has been validated and included in a block, and now the EVM will execute it step-by-step.",
      opcodes: [],
      stack: [],
      memory: "",
      storage: {},
    },
    {
      description:
        "The EVM begins execution by pushing the value 0x60 (96 in decimal) onto the stack. The PUSH1 operation is one of the most common EVM opcodes and is used to place a 1-byte value onto the stack. This will be used later as part of memory allocation.",
      opcodes: ["PUSH1 0x60"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
      ],
      memory: "",
      storage: {},
      gasUsed: 3,
    },
    {
      description:
        "Another value (0x40, or 64 in decimal) is pushed onto the stack. The stack is a Last-In-First-Out (LIFO) data structure, so 0x40 is now at the top of the stack. These two values will be used together in the next operation to initialize memory.",
      opcodes: ["PUSH1 0x40"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
      ],
      memory: "",
      storage: {},
      gasUsed: 6,
    },
    {
      description:
        "The MSTORE operation stores a value in memory. It takes two parameters from the stack: the memory address (0x40) and the value to store (0x60). This operation effectively initializes the free memory pointer, which is a convention in Solidity to track available memory. Gas cost increases with memory expansion.",
      opcodes: ["MSTORE"],
      stack: [],
      memory:
        "0x0000000000000000000000000000000000000000000000000000000000000060",
      storage: {},
      gasUsed: 9,
    },
    {
      description:
        "CALLVALUE pushes the amount of ETH sent with the transaction (0.1 ETH) onto the stack. This operation is often used at the beginning of a contract to check if any ETH was sent or to implement payable functions. The value is represented in wei (10^18 wei = 1 ETH).",
      opcodes: ["CALLVALUE"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      ],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {},
      gasUsed: 11,
    },
    {
      description:
        "The ISZERO operation checks if the top stack item is zero. It pops the top value (the transaction value) and pushes 1 if it was zero, or 0 if it wasn't. This is commonly used for conditional logic, like checking if ETH was sent with a transaction.",
      opcodes: ["ISZERO"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000001",
      ],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {},
      gasUsed: 14,
    },
    {
      description:
        "SSTORE saves a value to persistent storage. It takes two parameters: the storage slot (0x0) and the value to store (0x60). Unlike memory, storage persists between transactions and blocks. This is one of the most gas-expensive operations in the EVM because it changes blockchain state.",
      opcodes: ["SSTORE"],
      stack: [
        "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x0000000000000000000000000000000000000000000000000000000000000040",
      ],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0":
          "0x0000000000000000000000000000000000000000000000000000000000000060",
      },
      gasUsed: 5014, // SSTORE costs 5000 gas for a new storage slot
    },
    {
      description:
        "The EVM begins updating the world state to reflect changes made during execution. At this stage, the storage changes are committed to the contract's state tree. The EVM is preparing to make the state transition final.",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0":
          "0x0000000000000000000000000000000000000000000000000000000000000060",
      },
      gasUsed: 5014,
    },
    {
      description:
        "Further storage updates are processed. In this step, another storage slot is updated. Each storage update requires updating the Merkle Patricia Trie that represents the account's storage.",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0":
          "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x1":
          "0x0000000000000000000000000000000000000000000000000000000000000040",
      },
      gasUsed: 10014, // Another 5000 gas for the second storage slot
    },
    {
      description:
        "The value transfer of 0.1 ETH occurs in this step. The sender's balance is reduced and the recipient's balance is increased accordingly. The EVM ensures that the sender has sufficient funds for both the transfer amount and gas costs.",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0":
          "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x1":
          "0x0000000000000000000000000000000000000000000000000000000000000040",
      },
      gasUsed: 10014,
    },
    {
      description:
        "The transaction is now complete. All state changes have been finalized, including the ETH transfer and storage updates. The sender's account nonce has been incremented to prevent replay attacks. Gas has been consumed and the appropriate fee has been transferred to the miner.",
      opcodes: [],
      stack: [],
      memory:
        "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040",
      storage: {
        "0x0":
          "0x0000000000000000000000000000000000000000000000000000000000000060",
        "0x1":
          "0x0000000000000000000000000000000000000000000000000000000000000040",
      },
      gasUsed: 21000, // Standard gas for a basic ETH transfer
    },
  ],
  category: "basic",
  author: "EVM Visualizer Team",
  tags: ["transfer", "basic", "ethereum"],
  complexity: "beginner",
};
