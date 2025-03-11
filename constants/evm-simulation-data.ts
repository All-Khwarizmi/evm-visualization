// Sample data for EVM simulation components

// Gas costs for opcodes in the default scenario
export const defaultOpcodeGasCosts = [
  { opcode: "PUSH1", gas: 3 },
  { opcode: "MSTORE", gas: 3 },
  { opcode: "CALLVALUE", gas: 2 },
  { opcode: "ISZERO", gas: 3 },
  { opcode: "SSTORE", gas: 5000 },
];

// Sample call stack for the default scenario
export const defaultCallStack = [
  {
    type: "CALL" as const,
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1234567890123456789012345678901234567890",
    value: "0.1",
    gasLimit: 21000,
    depth: 0,
  },
];

// Disassembled bytecode matching our default scenario
export const defaultDisassembledOpcodes = [
  { offset: 0, opcode: "PUSH1", value: "0x60", gas: 3 },
  { offset: 2, opcode: "PUSH1", value: "0x40", gas: 3 },
  { offset: 4, opcode: "MSTORE", value: "", gas: 3 },
  { offset: 5, opcode: "CALLVALUE", value: "", gas: 2 },
  { offset: 6, opcode: "ISZERO", value: "", gas: 3 },
  { offset: 8, opcode: "SSTORE", value: "", gas: 5000 },
  // These opcodes align with our default scenario steps
];
