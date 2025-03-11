"use client";

import { useState, useEffect, useCallback } from "react";
import type {
  EVMTransaction,
  EVMStack,
  EVMMemory,
  EVMStorage,
  EVMWorldState,
} from "@/types/evm";
import type { EVMScenario } from "@/types/scenarios";
import {
  defaultScenario,
  initialStack,
  initialMemory,
  initialStorage,
  initialWorldState,
} from "@/constants/scenarios";

export function useEVMSimulation(scenario?: EVMScenario) {
  const [currentScenario, setCurrentScenario] = useState<EVMScenario>(
    scenario || defaultScenario
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [transaction, setTransaction] = useState<EVMTransaction>(
    currentScenario.transaction
  );
  const [stack, setStack] = useState<EVMStack>(initialStack);
  const [memory, setMemory] = useState<EVMMemory>(initialMemory);
  const [storage, setStorage] = useState<EVMStorage>(initialStorage);
  const [worldState, setWorldState] =
    useState<EVMWorldState>(initialWorldState);
  const [currentOpcode, setCurrentOpcode] = useState<string>("");
  const [gasUsed, setGasUsed] = useState(0);
  const [gasRemaining, setGasRemaining] = useState(
    currentScenario.transaction.gasLimit
  );
  const [executionInterval, setExecutionInterval] = useState(1000); // Default 1 second

  // Total steps in the simulation
  const totalSteps = currentScenario.steps.length - 1;

  // Load a new scenario
  const loadScenario = useCallback((newScenario: EVMScenario) => {
    setCurrentScenario(newScenario);
    setTransaction(newScenario.transaction);
    setGasRemaining(newScenario.transaction.gasLimit);
    resetSimulation();
  }, []);

  // Simulation steps with more granular control
  const simulateStep = useCallback(
    (step: number) => {
      if (step < 0 || step > totalSteps) return;

      const currentStepData = currentScenario.steps[step];

      // Set current opcode
      if (currentStepData.opcodes && currentStepData.opcodes.length > 0) {
        setCurrentOpcode(currentStepData.opcodes[0]);
      } else {
        setCurrentOpcode("");
      }

      // Update gas
      const stepGasUsed = currentStepData.gasUsed || step * 3;
      setGasUsed(stepGasUsed);
      setGasRemaining(transaction.gasLimit - stepGasUsed);

      // Update stack
      if (currentStepData.stack) {
        setStack({
          items: currentStepData.stack,
        });
      } else {
        setStack(initialStack);
      }

      // Update memory
      if (currentStepData.memory) {
        setMemory({
          data: currentStepData.memory,
          size: currentStepData.memory.length / 2 - 1, // Rough estimate
          preview:
            currentStepData.memory.length > 20
              ? `${currentStepData.memory.substring(
                  0,
                  10
                )}...${currentStepData.memory.substring(
                  currentStepData.memory.length - 10
                )}`
              : currentStepData.memory,
        });
      } else {
        setMemory(initialMemory);
      }

      // Update storage
      if (currentStepData.storage) {
        setStorage({
          slots: currentStepData.storage,
        });
      } else {
        setStorage(initialStorage);
      }

      // Update world state
      if (currentStepData.worldState) {
        setWorldState((prev) => ({
          ...prev,
          ...currentStepData.worldState,
        }));
      } else if (step >= 7) {
        // Legacy behavior for backward compatibility
        const updatedAccounts = { ...initialWorldState.accounts };

        // Update sender balance (gas cost)
        const senderBalance = Number.parseFloat(
          updatedAccounts[transaction.from].balance
        );
        updatedAccounts[transaction.from] = {
          ...updatedAccounts[transaction.from],
          balance: (senderBalance - step * 0.001).toFixed(3),
          nonce: updatedAccounts[transaction.from].nonce + (step >= 10 ? 1 : 0),
        };

        // Update recipient balance (value transfer)
        if (step >= 9) {
          const recipientBalance = Number.parseFloat(
            updatedAccounts[transaction.to].balance
          );
          const transferAmount = Number.parseFloat(transaction.value);
          updatedAccounts[transaction.to] = {
            ...updatedAccounts[transaction.to],
            balance: (recipientBalance + transferAmount).toFixed(3),
          };
        }

        setWorldState({
          accounts: updatedAccounts,
        });
      } else {
        setWorldState(initialWorldState);
      }
    },
    [currentScenario, totalSteps, transaction]
  );

  // Reset simulation when transaction changes
  useEffect(() => {
    resetSimulation();
  }, [transaction]);

  // Start simulation
  const startSimulation = useCallback(() => {
    setIsRunning(true);
  }, []);

  // Pause simulation
  const pauseSimulation = useCallback(() => {
    setIsRunning(false);
  }, []);

  // Reset simulation
  const resetSimulation = useCallback(() => {
    setCurrentStep(0);
    setIsRunning(false);
    setStack(initialStack);
    setMemory(initialMemory);
    setStorage(initialStorage);
    setWorldState(initialWorldState);
    setCurrentOpcode("");
    setGasUsed(0);
    setGasRemaining(transaction.gasLimit);
  }, [transaction.gasLimit]);

  // Step forward
  const stepForward = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  }, [currentStep, totalSteps]);

  // Step backward
  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  // Run simulation when isRunning is true
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < totalSteps) {
            return prev + 1;
          } else {
            setIsRunning(false);
            return prev;
          }
        });
      }, executionInterval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, totalSteps, executionInterval]);

  // Update state based on current step
  useEffect(() => {
    simulateStep(currentStep);
  }, [currentStep, simulateStep]);

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
  };
}
