"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Plus, Trash2 } from "lucide-react"
import type { EVMStep } from "@/types/scenarios"

interface ScenarioStepsProps {
  steps: EVMStep[]
  onChange: (steps: EVMStep[]) => void
}

export function ScenarioSteps({ steps, onChange }: ScenarioStepsProps) {
  const [expandedStep, setExpandedStep] = useState<string>("step-0");

  const addStep = () => {
    const newSteps = [
      ...steps,
      {
        description: `Step ${steps.length}`,
        opcodes: [],
        stack: [],
        memory: "0x",
        storage: {},
      },
    ];
    onChange(newSteps);
    setExpandedStep(`step-${steps.length}`);
  };

  const removeStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    onChange(newSteps);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateStep = (index: number, field: keyof EVMStep, value: any) => {
    const newSteps = [...steps];
    newSteps[index] = {
      ...newSteps[index],
      [field]: value,
    };
    onChange(newSteps);
  };

  const updateArrayField = (
    index: number,
    field: "opcodes" | "stack",
    value: string
  ) => {
    const newSteps = [...steps];
    newSteps[index][field] = value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    onChange(newSteps);
  };

  const updateStorageField = (index: number, value: string) => {
    try {
      const storageObj = JSON.parse(value);
      const newSteps = [...steps];
      newSteps[index].storage = storageObj;
      onChange(newSteps);
    } catch (e) {
      // Handle JSON parse error
      console.error("Invalid JSON for storage:", e);
    }
  };

  return (
    <div className="space-y-4 py-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Execution Steps</h3>
        <Button onClick={addStep} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Step
        </Button>
      </div>

      <Accordion
        type="single"
        value={expandedStep}
        onValueChange={setExpandedStep}
        collapsible
        className="w-full"
      >
        {steps.map((step, index) => (
          <AccordionItem key={index} value={`step-${index}`}>
            <AccordionTrigger className="hover:bg-slate-100 dark:hover:bg-slate-800 px-4 rounded-md">
              <div className="flex justify-between items-center w-full pr-4">
                <span>
                  Step {index}: {step.description}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStep(index);
                  }}
                  className="h-8 w-8 opacity-70 hover:opacity-100"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="border-0 shadow-none">
                <CardContent className="pt-4">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`step-${index}-description`}>
                        Description
                      </Label>
                      <Input
                        id={`step-${index}-description`}
                        value={step.description}
                        onChange={(e) =>
                          updateStep(index, "description", e.target.value)
                        }
                        placeholder="What happens in this step..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`step-${index}-opcodes`}>
                          Opcodes (one per line)
                        </Label>
                        <Textarea
                          id={`step-${index}-opcodes`}
                          value={step.opcodes.join("\n")}
                          onChange={(e) =>
                            updateArrayField(index, "opcodes", e.target.value)
                          }
                          placeholder="PUSH1 0x60
PUSH1 0x40
MSTORE"
                          className="font-mono text-xs min-h-[100px]"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor={`step-${index}-stack`}>
                          Stack Items (one per line)
                        </Label>
                        <Textarea
                          id={`step-${index}-stack`}
                          value={step.stack.join("\n")}
                          onChange={(e) =>
                            updateArrayField(index, "stack", e.target.value)
                          }
                          placeholder="0x60
0x40"
                          className="font-mono text-xs min-h-[100px]"
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor={`step-${index}-memory`}>
                        Memory (hex)
                      </Label>
                      <Input
                        id={`step-${index}-memory`}
                        value={step.memory}
                        onChange={(e) =>
                          updateStep(index, "memory", e.target.value)
                        }
                        placeholder="0x0000...0060"
                        className="font-mono text-xs"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor={`step-${index}-storage`}>
                        Storage (JSON)
                      </Label>
                      <Textarea
                        id={`step-${index}-storage`}
                        value={JSON.stringify(step.storage, null, 2)}
                        onChange={(e) =>
                          updateStorageField(index, e.target.value)
                        }
                        placeholder='{"0x0": "0x60", "0x1": "0x40"}'
                        className="font-mono text-xs min-h-[100px]"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

