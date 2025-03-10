"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Check } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { EVMTransaction } from "@/types/evm";

interface TransactionLoaderProps {
  onLoadTransaction: (transaction: EVMTransaction) => void;
}

export function TransactionLoader({
  onLoadTransaction,
}: TransactionLoaderProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [value, setValue] = useState("");
  const [gasLimit, setGasLimit] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [data, setData] = useState("");
  const [nonce, setNonce] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Basic validation
    if (!from || !from.startsWith("0x")) {
      setError(
        "From address must be a valid Ethereum address starting with 0x"
      );
      return;
    }

    if (!to || !to.startsWith("0x")) {
      setError("To address must be a valid Ethereum address starting with 0x");
      return;
    }

    try {
      const transaction: EVMTransaction = {
        from,
        to,
        value: value || "0",
        gasLimit: Number.parseInt(gasLimit) || 21000,
        gasPrice: Number.parseInt(gasPrice) || 20,
        data: data || "0x",
        nonce: Number.parseInt(nonce) || 0,
      };

      onLoadTransaction(transaction);
      setSuccess(true);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to load transaction. Please check your inputs.");
    }
  };

  const handleLoadExample = () => {
    setFrom("0x742d35Cc6634C0532925a3b844Bc454e4438f44e");
    setTo("0x1234567890123456789012345678901234567890");
    setValue("0.1");
    setGasLimit("21000");
    setGasPrice("20");
    setData(
      "0x608060405234801561001057600080fd5b5060f78061001f6000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c8063771602f714602d575b600080fd5b605660048036036040811015604157600080fd5b8101908080359060200190929190803590602001909291905050506058565b005b8082016000819055505056fea2646970667358221220c8daade51f385271f21c2b8e19adf4e2bbe5730a152e3603762723a0d7f3f05364736f6c634300060c0033"
    );
    setNonce("5");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Load Custom Transaction</CardTitle>
        <CardDescription>
          Enter transaction details to visualize
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From Address</Label>
              <Input
                id="from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To Address</Label>
              <Input
                id="to"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="0x..."
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value (ETH)</Label>
              <Input
                id="value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gasLimit">Gas Limit</Label>
              <Input
                id="gasLimit"
                value={gasLimit}
                onChange={(e) => setGasLimit(e.target.value)}
                placeholder="21000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gasPrice">Gas Price (Gwei)</Label>
              <Input
                id="gasPrice"
                value={gasPrice}
                onChange={(e) => setGasPrice(e.target.value)}
                placeholder="20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="data">Transaction Data (Bytecode)</Label>
            <Textarea
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="0x..."
              className="font-mono text-xs h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nonce">Nonce</Label>
            <Input
              id="nonce"
              value={nonce}
              onChange={(e) => setNonce(e.target.value)}
              placeholder="0"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300 border-green-200 dark:border-green-800">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Transaction loaded successfully!
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={handleLoadExample}>
              Load Example
            </Button>
            <Button type="submit">Load Transaction</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
