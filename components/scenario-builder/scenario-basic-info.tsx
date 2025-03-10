"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { EVMTransaction } from "@/types/scenarios"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ScenarioBasicInfoProps {
  transaction: EVMTransaction
  name: string
  description: string
  category?: string
  author?: string
  tags?: string[]
  complexity?: string
  onChange: (
    transaction: EVMTransaction,
    name: string,
    description: string,
    category?: string,
    author?: string,
    tags?: string[],
    complexity?: string,
  ) => void
}

export function ScenarioBasicInfo({
  transaction,
  name,
  description,
  category = "basic",
  author = "",
  tags = [],
  complexity = "beginner",
  onChange,
}: ScenarioBasicInfoProps) {
  // Local state for form values
  const [localTransaction, setLocalTransaction] = useState<EVMTransaction>({ ...transaction })
  const [localName, setLocalName] = useState(name)
  const [localDescription, setLocalDescription] = useState(description)
  const [localCategory, setLocalCategory] = useState(category)
  const [localAuthor, setLocalAuthor] = useState(author)
  const [localTags, setLocalTags] = useState<string[]>([...tags])
  const [localComplexity, setLocalComplexity] = useState(complexity)

  // Simple debounce function
  const debouncedUpdate = () => {
    onChange(localTransaction, localName, localDescription, localCategory, localAuthor, localTags, localComplexity)
  }

  // Update transaction field
  const updateTransaction = (field: keyof EVMTransaction, value: string | number) => {
    setLocalTransaction((prev) => {
      const updated = { ...prev, [field]: value }
      return updated
    })
    // Use setTimeout to debounce the update
    setTimeout(debouncedUpdate, 0)
  }

  return (
    <div className="space-y-4 py-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Scenario Name</Label>
          <Input
            id="name"
            value={localName}
            onChange={(e) => {
              setLocalName(e.target.value)
              setTimeout(debouncedUpdate, 0)
            }}
            placeholder="e.g., Flash Loan Attack Simulation"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={localDescription}
            onChange={(e) => {
              setLocalDescription(e.target.value)
              setTimeout(debouncedUpdate, 0)
            }}
            placeholder="Describe what this scenario demonstrates..."
            className="min-h-[100px]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={localCategory}
              onValueChange={(value) => {
                setLocalCategory(value)
                setTimeout(debouncedUpdate, 0)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="tokens">Tokens</SelectItem>
                <SelectItem value="defi">DeFi</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="complexity">Complexity</Label>
            <Select
              value={localComplexity}
              onValueChange={(value) => {
                setLocalComplexity(value)
                setTimeout(debouncedUpdate, 0)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select complexity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={localAuthor}
            onChange={(e) => {
              setLocalAuthor(e.target.value)
              setTimeout(debouncedUpdate, 0)
            }}
            placeholder="Your name or GitHub username"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="tags">Tags (comma separated)</Label>
          <Input
            id="tags"
            value={localTags.join(", ")}
            onChange={(e) => {
              setLocalTags(e.target.value.split(",").map((tag) => tag.trim()))
              setTimeout(debouncedUpdate, 0)
            }}
            placeholder="e.g., erc20, transfer, tokens"
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Transaction Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="from">From Address</Label>
              <Input
                id="from"
                value={localTransaction.from}
                onChange={(e) => updateTransaction("from", e.target.value)}
                placeholder="0x..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="to">To Address</Label>
              <Input
                id="to"
                value={localTransaction.to}
                onChange={(e) => updateTransaction("to", e.target.value)}
                placeholder="0x..."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="value">Value (ETH)</Label>
              <Input
                id="value"
                value={localTransaction.value}
                onChange={(e) => updateTransaction("value", e.target.value)}
                placeholder="0.0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="nonce">Nonce</Label>
              <Input
                id="nonce"
                type="number"
                value={localTransaction.nonce}
                onChange={(e) => updateTransaction("nonce", Number.parseInt(e.target.value) || 0)}
                placeholder="0"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gasLimit">Gas Limit</Label>
              <Input
                id="gasLimit"
                type="number"
                value={localTransaction.gasLimit}
                onChange={(e) => updateTransaction("gasLimit", Number.parseInt(e.target.value) || 21000)}
                placeholder="21000"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="gasPrice">Gas Price (Gwei)</Label>
              <Input
                id="gasPrice"
                type="number"
                value={localTransaction.gasPrice}
                onChange={(e) => updateTransaction("gasPrice", Number.parseInt(e.target.value) || 20)}
                placeholder="20"
              />
            </div>

            <div className="grid gap-2 col-span-2">
              <Label htmlFor="data">Transaction Data (Bytecode)</Label>
              <Textarea
                id="data"
                value={localTransaction.data}
                onChange={(e) => updateTransaction("data", e.target.value)}
                placeholder="0x..."
                className="font-mono text-xs"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

