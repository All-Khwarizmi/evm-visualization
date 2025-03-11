"use client";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroDemo() {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [connectorPaths, setConnectorPaths] = useState({
    transactionToOpcode: "M 0,0 L 0,0",
    opcodeToStack: "M 0,0 L 0,0",
    opcodeToMemory: "M 0,0 L 0,0",
  });

  const maxSteps = 5;

  // Refs for nodes to calculate connector paths
  const transactionRef = useRef<HTMLDivElement>(null);
  const opcodeRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const memoryRef = useRef<HTMLDivElement>(null);

  // Calculate connector paths based on node positions
  useEffect(() => {
    const calculatePaths = () => {
      if (
        transactionRef.current &&
        opcodeRef.current &&
        stackRef.current &&
        memoryRef.current
      ) {
        const transactionRect = transactionRef.current?.getBoundingClientRect();
        const opcodeRect = opcodeRef.current.getBoundingClientRect();
        const stackRect = stackRef.current.getBoundingClientRect();
        const memoryRect = memoryRef.current.getBoundingClientRect();

        // Calculate positions relative to the container
        const container =
          transactionRef.current.parentElement?.getBoundingClientRect();

        // Transaction to Opcode (from bottom of transaction to top of opcode)
        const txToOpX1 =
          transactionRect.left + transactionRect.width / 2 - container?.left!;
        const txToOpY1 = transactionRect.bottom - container?.top!;
        const txToOpX2 =
          opcodeRect.left + opcodeRect.width / 2 - container?.left!;
        const txToOpY2 = opcodeRect.top - container?.top!;

        // Opcode to Stack (from left of opcode to top of stack)
        const opToStackX1 = opcodeRect.left - container?.left!;
        const opToStackY1 =
          opcodeRect.top + opcodeRect.height / 2 - container?.top!;
        const opToStackX2 =
          stackRect.left + stackRect.width / 2 - container?.left!;
        const opToStackY2 = stackRect.top - container?.top!;

        // Opcode to Memory (from right of opcode to top of memory)
        const opToMemX1 = opcodeRect.right - container?.left!;
        const opToMemY1 =
          opcodeRect.top + opcodeRect.height / 2 - container?.top!;
        const opToMemX2 =
          memoryRect.left + memoryRect.width / 2 - container?.left!;
        const opToMemY2 = memoryRect.top - container?.top!;

        setConnectorPaths({
          transactionToOpcode: `M ${txToOpX1},${txToOpY1} L ${txToOpX2},${txToOpY2}`,
          opcodeToStack: `M ${opToStackX1},${opToStackY1} L ${opToStackX2},${opToStackY2}`,
          opcodeToMemory: `M ${opToMemX1},${opToMemY1} L ${opToMemX2},${opToMemY2}`,
        });
      }
    };

    // Initial calculation
    calculatePaths();

    // Recalculate on window resize
    window.addEventListener("resize", calculatePaths);
    return () => window.removeEventListener("resize", calculatePaths);
  }, []);

  // Auto-play effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => (prev < maxSteps ? prev + 1 : 0));
      }, 1500);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setStep((prev) => (prev < maxSteps ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setStep((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto rounded-xl border border-purple-800/30 bg-[#0B0D19] p-4 shadow-[0_0_30px_rgba(124,58,237,0.15)]">
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
        {/* Transaction Node */}
        <motion.div
          ref={transactionRef}
          className="absolute top-6 left-6 w-48 p-3 rounded-lg bg-purple-900/50 border border-purple-700/30 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-xs text-purple-300 mb-1">Transaction</div>
          <div className="text-[10px] text-slate-300 font-mono">
            0x742d35Cc6634C0532...
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-slate-400">
            <span>Value: 0.1 ETH</span>
            <span>Gas: 21000</span>
          </div>
        </motion.div>

        {/* Stack Node */}
        <motion.div
          ref={stackRef}
          className="absolute bottom-20 left-6 w-40 p-3 rounded-lg bg-blue-900/50 border border-blue-700/30 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 1 ? 1 : 0.3 }}
        >
          <div className="text-xs text-blue-300 mb-1">Stack</div>
          <div className="space-y-1">
            <AnimatePresence>
              {step >= 2 && (
                <motion.div
                  key="stack-item-1"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] font-mono bg-blue-900/30 p-1 rounded"
                >
                  0x60
                </motion.div>
              )}
              {step >= 3 && (
                <motion.div
                  key="stack-item-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-[10px] font-mono bg-blue-900/30 p-1 rounded"
                >
                  0x40
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Memory Node */}
        <motion.div
          ref={memoryRef}
          className="absolute bottom-20 right-6 w-40 p-3 rounded-lg bg-green-900/50 border border-green-700/30 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: step >= 2 ? 1 : 0.3 }}
        >
          <div className="text-xs text-green-300 mb-1">Memory</div>
          <div className="grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => {
              return (
                <motion.div
                  key={uuidv4()}
                  className={`w-6 h-6 flex items-center justify-center text-[8px] font-mono rounded ${
                    step >= 4 && i < 4 ? "bg-green-700/40" : "bg-slate-800/50"
                  }`}
                  animate={{
                    backgroundColor:
                      step >= 4 && i < 4
                        ? "rgba(4, 120, 87, 0.4)"
                        : "rgba(15, 23, 42, 0.5)",
                  }}
                >
                  {step >= 4 && i < 4
                    ? "0x" + i.toString(16).padStart(2, "0")
                    : ""}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Opcode Node */}
        <motion.div
          ref={opcodeRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 p-3 rounded-lg bg-rose-950/50 border border-rose-700/30 shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-xs text-rose-300 mb-1">Current Opcode</div>
          <div className="text-center font-mono text-lg font-bold text-white">
            {step === 0 && "READY"}
            {step === 1 && "PUSH1 0x60"}
            {step === 2 && "PUSH1 0x40"}
            {step === 3 && "MSTORE"}
            {step === 4 && "CALLVALUE"}
            {step === 5 && "COMPLETE"}
          </div>
          <div className="mt-2 text-center text-[10px] text-slate-400">
            {step === 0 && "Ready to execute"}
            {step === 1 && "Push 1-byte value onto stack"}
            {step === 2 && "Push another value onto stack"}
            {step === 3 && "Store value in memory"}
            {step === 4 && "Get transaction value"}
            {step === 5 && "Execution complete"}
          </div>
        </motion.div>

        {/* Animated Connection Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Transaction to Opcode */}
          <motion.path
            d={connectorPaths.transactionToOpcode}
            stroke="#9333ea"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: step >= 1 ? 1 : 0,
              opacity: step >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Opcode to Stack */}
          <motion.path
            d={connectorPaths.opcodeToStack}
            stroke="#3b82f6"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: step >= 2 ? 1 : 0,
              opacity: step >= 2 ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />

          {/* Opcode to Memory */}
          <motion.path
            d={connectorPaths.opcodeToMemory}
            stroke="#22c55e"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: step >= 3 ? 1 : 0,
              opacity: step >= 3 ? 1 : 0,
            }}
            transition={{ duration: 0.5 }}
          />
        </svg>

        {/* Step Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {Array.from({ length: maxSteps + 1 }).map((_, i) => {
            return (
              <div
                key={uuidv4()}
                className={`w-2 h-2 rounded-full ${
                  i === step ? "bg-purple-500" : "bg-slate-700"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          className="bg-transparent border-slate-700 text-white hover:bg-slate-800"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrev}
          disabled={step === 0}
          className="bg-transparent border-slate-700 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={togglePlay}
          className="bg-transparent border-slate-700 text-white hover:bg-slate-800"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={step === maxSteps}
          className="bg-transparent border-slate-700 text-white hover:bg-slate-800 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
