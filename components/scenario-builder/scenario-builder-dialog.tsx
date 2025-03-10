"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle } from "lucide-react";
import { ScenarioBasicInfo } from "./scenario-basic-info";
import { ScenarioSteps } from "./scenario-steps";
import { ScenarioPreview } from "./scenario-preview";
import type { EVMScenario, EVMStep } from "@/types/scenarios";
import { EVMTransaction } from "@/types/evm";

interface ScenarioBuilderDialogProps {
  onSaveScenario: (scenario: EVMScenario) => void;
}

// Default scenario state
const defaultScenario: EVMScenario = {
  name: "",
  description: "",
  transaction: {
    from: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    to: "0x1234567890123456789012345678901234567890",
    value: "0",
    gasLimit: 21000,
    gasPrice: 20,
    data: "0x",
    nonce: 0,
  },
  steps: [
    {
      description: "Initial state",
      opcodes: [],
      stack: [],
      memory: "0x",
      storage: {},
    },
  ],
};

// Separate the dialog content into its own component
function ScenarioBuilderContent({
  onSave,
}: {
  onSave: (scenario: EVMScenario) => void;
}) {
  const [activeTab, setActiveTab] = useState("basic-info");
  const [scenario, setScenario] = useState<EVMScenario>({ ...defaultScenario });

  const updateBasicInfo = useCallback(
    (
      transaction: EVMTransaction,
      name: string,
      description: string,
      category?: string,
      author?: string,
      tags?: string[],
      complexity?: string
    ) => {
      setScenario((prev) => ({
        ...prev,
        name,
        description,
        transaction,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        category: category as any,
        author,
        tags,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        complexity: complexity as any,
      }));
    },
    []
  );

  const updateSteps = useCallback((steps: EVMStep[]) => {
    setScenario((prev) => ({
      ...prev,
      steps,
    }));
  }, []);

  const handleSave = () => {
    onSave(scenario);
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create Custom EVM Scenario</DialogTitle>
        <DialogDescription>
          Build a custom EVM execution scenario for visualization. Define
          transaction details and execution steps.
        </DialogDescription>
      </DialogHeader>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
          <TabsTrigger value="steps">Execution Steps</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic-info">
          <ScenarioBasicInfo
            transaction={scenario.transaction}
            name={scenario.name}
            description={scenario.description}
            category={scenario.category}
            author={scenario.author}
            tags={scenario.tags}
            complexity={scenario.complexity}
            onChange={updateBasicInfo}
          />
          <div className="flex justify-end mt-4">
            <Button onClick={() => setActiveTab("steps")}>
              Next: Define Steps
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="steps">
          <ScenarioSteps steps={scenario.steps} onChange={updateSteps} />
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => setActiveTab("basic-info")}
            >
              Back
            </Button>
            <Button onClick={() => setActiveTab("preview")}>
              Next: Preview
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <ScenarioPreview scenario={scenario} />
          <div className="flex justify-between mt-4">
            <Button variant="outline" onClick={() => setActiveTab("steps")}>
              Back
            </Button>
            <Button onClick={handleSave}>Save Scenario</Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}

export function ScenarioBuilderDialog({
  onSaveScenario,
}: ScenarioBuilderDialogProps) {
  const [open, setOpen] = useState(false);
  // Use a key to force remount of the content component
  const [contentKey, setContentKey] = useState(0);

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen !== open) {
      setOpen(newOpen);
      // If closing, increment the key to force a remount on next open
      if (!newOpen) {
        setTimeout(() => {
          setContentKey((prev) => prev + 1);
        }, 300); // Wait for dialog close animation
      }
    }
  };

  const handleSave = (scenario: EVMScenario) => {
    onSaveScenario(scenario);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Custom Scenario
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        {/* Use key to force remount */}
        <div key={contentKey}>
          <ScenarioBuilderContent onSave={handleSave} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
