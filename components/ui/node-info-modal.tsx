"use client"

import type React from "react"
import { X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NodeInfoModalProps {
  title: string
  description: string
  content: React.ReactNode
  isOpen: boolean
  onClose: () => void
}

export function NodeInfoModal({ title, description, content, isOpen, onClose }: NodeInfoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/70 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col bg-white dark:bg-slate-900">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">{content}</CardContent>
      </Card>
    </div>
  )
}

