"use client"

import { useEffect } from "react"

interface KeyboardShortcutHandlers {
  onStepForward: () => void
  onStepBackward: () => void
  onPlayPause: () => void
  onReset: () => void
}

export function useKeyboardShortcuts({
  onStepForward,
  onStepBackward,
  onPlayPause,
  onReset,
}: KeyboardShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return
      }

      switch (event.key) {
        case "ArrowRight":
          onStepForward()
          event.preventDefault()
          break
        case "ArrowLeft":
          onStepBackward()
          event.preventDefault()
          break
        case " ": // Space
          onPlayPause()
          event.preventDefault()
          break
        case "r":
          onReset()
          event.preventDefault()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [onStepForward, onStepBackward, onPlayPause, onReset])
}

