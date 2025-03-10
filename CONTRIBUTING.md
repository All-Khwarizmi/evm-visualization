# Contributing to EVM Visualizer

Thank you for your interest in contributing to the EVM Visualizer project! This document provides guidelines and instructions for contributing.

## Ways to Contribute

There are several ways you can contribute to the EVM Visualizer:

1. **Bug Reports**: Report bugs or issues you encounter
2. **Feature Requests**: Suggest new features or improvements
3. **Documentation**: Improve or extend the documentation
4. **Code Contributions**: Submit code changes or new features
5. **Custom Scenarios**: Create and share EVM execution scenarios

## Contributing Custom Scenarios

One of the most valuable contributions you can make is to create custom EVM execution scenarios that help others understand complex blockchain interactions.

### Scenario Requirements

All contributed scenarios should:

1. **Be Educational**: Demonstrate a specific concept, pattern, or interaction
2. **Be Accurate**: Correctly represent EVM behavior
3. **Be Well-Documented**: Include clear descriptions for each step
4. **Be Self-Contained**: Work without external dependencies

### Scenario Submission Process

To submit a custom scenario:

1. **Create Your Scenario**: Use the Scenario Builder UI or create a JSON file manually
2. **Test Your Scenario**: Ensure it works correctly in the EVM Visualizer
3. **Export to JSON**: Export your scenario as a JSON file
4. **Submit a Pull Request**: Add your scenario to the `scenarios/community` directory

### Scenario File Structure

Your scenario file should follow this structure:

```json
{
  "name": "Descriptive Name",
  "description": "Detailed explanation of what this scenario demonstrates",
  "category": "One of: basic, tokens, defi, security, other",
  "author": "Your Name or GitHub username",
  "transaction": {
    "from": "0x...",
    "to": "0x...",
    "value": "0",
    "gasLimit": 21000,
    "gasPrice": 20,
    "data": "0x...",
    "nonce": 0
  },
  "steps": [
    {
      "description": "Step description",
      "opcodes": ["OPCODE1", "OPCODE2"],
      "stack": ["0x..."],
      "memory": "0x...",
      "storage": {}
    }
    // More steps...
  ]
}

